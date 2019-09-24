//Dylan DeGrood
var express = require('express');
var router = express.Router();

/* JSON Order object to be requested */
router.post('/', function (req, res) {
    var cherryObj = {topping: "Cherry", quantity: "20"};
    var plainObj = {topping: "Plain", quantity: "33"};
    var chocolateObj = {topping: "Chocolate", quantity: "15"};
    
    orders = [cherryObj, plainObj, chocolateObj];
    
    res.send(orders);
});

module.exports = router;