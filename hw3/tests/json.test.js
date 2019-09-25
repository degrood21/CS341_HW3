// Dylan DeGrood
const ordersJS = require("../routes/orders");
const ordersCopyArray = ordersJS.orders;

test('test orders array is there', () => {
    // Testing to make sure the file was accessed correctly, and whether the array definied
    // in orders route file was transferred over.
    expect(ordersJS).toEqual(expect.anything());
    // Tests that the expected value from the JSON object is there
    expect(ordersCopyArray.ordersData[0].quantity).toEqual("20");
});
//Source: Dylan Pascua helped me to fix my unit test and showed me how to transfer the array over