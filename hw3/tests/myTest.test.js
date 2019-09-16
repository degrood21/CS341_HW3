//Tests whether of not the first paragraph (p) in html says "Quantity Topping"
var fs = require('fs');
test('test selectEvent', () => {
    //Read the index.html file into a string
    var html = fs.readFileSync('public/index.html', 'utf8'); 
    expect(html).toEqual(expect.anything()); //any non-null value is okay
    //put the HTML into a testing DOM and do a sanity check 
    document.body.innerHTML = html;
    const $ = require('jquery'); 
    expect($('p').html()).toBe("Quantity Topping");
});