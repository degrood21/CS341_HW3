//Dylan DeGrood
//orders.js
var express = require('express');
var router = express.Router();
var dbms = require ('./dbms.js')

//Post function for requesting query and receiving and sending the data
/*
* External Citation: Got help from Patrick
* Reason: Took 2 clicks to update the total orders for a month when processMonthData
* was outside the router.post
* Solution: Patrick had me put it inside the router.post and it fixed the problem
*/
router.post('/', function (req, res) {
    var month = req.body.month; //gets month from post call in cheesecake.js

    //string for the request to send to sql query
    var strRequest = "SELECT * From ORDERS WHERE MONTH='" + month +"'";
   
    //calling the query with the strRequest and function processMonthData
    dbms.dbquery(strRequest, processMonthData);

    //function to get the data from orders for the certain month to add up
    function processMonthData(rows, result) {
        var ordersfromMonthString;
        var ordersJSON;
        var cherryQuan = 0;
        var plainQuan = 0;
        var chocolateQuan = 0;
    
        //for loop iterates through data and adds up all flavor quantities for the month
        for(var i = 0; i < result.length; i++){
    
            ordersfromMonthString = JSON.stringify(result[i]);//gets first order
            ordersJSON = JSON.parse(ordersfromMonthString);//in order to be readable
            if(ordersJSON.TOPPING == 'Cherry'){
                cherryQuan += ordersJSON.QUANTITY;
            }
            else if(ordersJSON.TOPPING == 'Plain'){
                plainQuan += ordersJSON.QUANTITY;
            }
            else if(ordersJSON.TOPPING == 'Chocolate'){
                chocolateQuan += ordersJSON.QUANTITY;
            }
    
        }
        //variable to hold total orders for selected month to be sent back to client
        var orders = {
            "ordersData":
            [
                {
                    "topping" : "Cherry",
                    "quantity" : cherryQuan
                },
                {
                    "topping" : "Plain",
                    "quantity" : plainQuan
                },
                {
                    "topping" : "Chocolate",
                    "quantity" : chocolateQuan
                }
            ]
        };

        //Sends JSON object of total orders for month to client
        var strJSON = JSON.stringify(orders);
        res.send(strJSON);
    
    };
    
});

module.exports = router;
//module.exports.orders = orders; //Per Dylan P this is done for testing