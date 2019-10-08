//Dylan DeGrood
//neworder.js
/*
* route for inserting a new order when order button is pressed
*/
var express = require('express');
var router = express.Router();
var dbms = require ('./dbms.js')

//router.post handles the request and sends a query inserting the given data from req.body
router.post('/', function (req, res) {

    /*
    * Sends a query for all orders and makes sure the id is unique by checking it with all orders
    * and resets to a new random num if there is one that is equal
    */
    var ranNum = Math.floor(Math.random() * 10000);//unique id
    dbms.dbquery("SELECT * from ORDERS", processID);
    function processID(rows, result){
        var allOrdersStr;
        var ordersJSON;
        for(var i = 0; i < result.length; i++){
            allOrdersStr = JSON.stringify(result[i]);//gets first order
            ordersJSON = JSON.parse(allOrdersStr);//in order to be readable
            if(ranNum == ordersJSON.ORDERID){
                ranNum = Math.floor(Math.random() * 10000);
                i = 0;
            }
        }
    }
   
    strInsert = "insert into ORDERS(ORDERID, MONTH, DAY, QUANTITY, TOPPING, NOTES)";
    strValues = " values ("+ranNum+",'NOV',2,"+req.body.quantity+",'"+req.body.topping+"','"+req.body.notes+"')";
    strRequest = strInsert + strValues;//concatenates strInsert and strValues to make full request in query
    dbms.dbquery(strRequest, processNothing);

    //since there is no data being given back after inserting then
    //there is no need to process anything
    function processNothing(rows, result){};
    
});

module.exports = router;