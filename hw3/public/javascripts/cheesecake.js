//Dylan DeGrood
/*Helps to wait to run functions once the document fully loads*/
$(document).ready(function(){ 

    $(document).ready(function(){
      
      //gets Original values for orders that were inputed into html file
      var originalCherryText = document.getElementById("cherry").innerHTML;
      var originalChocolateText = document.getElementById("chocolate").innerHTML;
      var originalPlainText = document.getElementById("plain").innerHTML;

      $("#orderButton").click(function(){
 
        var flavorTopping = $("input[name='topping']:checked").val();
       //Source of above line: https://www.tutorialrepublic.com/faq/how-to-get-the-value-of-selected-radio-button-using-jquery.php
 
        var quantityFlavor = $("#quantitySelection").val();
 
        var notesTextarea = $("#notesText").val();
 
        //if else statement testing whether or not the word vegan is in the texture
        if(notesTextarea.toLowerCase().indexOf("vegan") != -1){
           alert("The Cheesecakes Contain Dairy!!");
        }
        else{
 
           //Removing all elements of order form
           $("#orderButton").remove();
           $("#notesText").remove();
           $("#quantity").remove();
           $("#paragraphNotes").remove();
           $("#toppingOptions").remove();
 
           //Adding Order Success msg and contents of Order
           var orderComplete = $("<p>Thank you! Your order has been placed</p>").css({"background-color": "lightblue", "font-size": "150%"});
           var orderInfo = $("<p>Topping Flavor: " + flavorTopping + "<br>Quantity of Flavor: " + quantityFlavor + "<br>Notes: " + notesTextarea + "</p>").css({"background-color": "lightblue", "font-size": "100%"});
 
           //Puts the order information and order complete message where the form was
           $("#cheesecakePic").after(orderInfo);
           $("#cheesecakePic").after(orderComplete);

           $.post("/neworder", 
            {
               quantity: quantityFlavor,
               topping: flavorTopping,
               notes: notesTextarea

            }, function(data){})
 
        }
 
      });
 
      //Source for getting value of month select:https://stackoverflow.com/questions/4871389/how-to-get-the-text-value-of-a-clicked-link
      $("#dropdownMenu a").click(function(){
 
         var month =  $(this).text();
         $('#monthSelect').text(month);

         //if the month is clicked then send a request to server for order information
         //Source form ww3 schools

         $.post("/orders", {month: $('#monthSelect').text()}, function(orders){
            var currentOrders = JSON.parse(orders);

            //Setting the corresponding html attributed to newly acquired info
            document.getElementById("cherry").innerHTML = currentOrders.ordersData[0].quantity + " " + currentOrders.ordersData[0].topping;
            document.getElementById("chocolate").innerHTML = currentOrders.ordersData[2].quantity + " " + currentOrders.ordersData[2].topping;
            document.getElementById("plain").innerHTML = currentOrders.ordersData[1].quantity + " " + currentOrders.ordersData[1].topping;
        
         });
 
      });
 
    });
 
 });