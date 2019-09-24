// Dylan DeGrood
//Source: http://www.sheshbabu.com/posts/unit-testing-express-route-handlers/
const assert = require("assert");
const httpMocks = require("node-mocks-http");
const router = require("../routes/orders");

describe("Example Router", () => {

  it("matches if cherry quantity is 20 form JSON object", () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            assert(myArr[0].quantity, "20");
        }
    };
    xmlhttp.open("POST", "/orders", true);
    xmlhttp.send();

  });

});