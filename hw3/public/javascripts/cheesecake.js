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
 
        }
 
      });
 
      //Source for getting value of month select:https://stackoverflow.com/questions/4871389/how-to-get-the-text-value-of-a-clicked-link
      $("#dropdownMenu a").click(function(){
 
         var month =  $(this).text();
         $('#monthSelect').text(month);

         //if the month is clicked then send a request to server for order information
         //else remain unchanged or switch back to default order numbers
         //Source form ww3 schools
         var xmlhttp = new XMLHttpRequest();
         xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200 /*&& month == "Mar"*/) {
               var myArr = JSON.parse(this.responseText);
               document.getElementById("cherry").innerHTML = myArr[0].quantity + " " + myArr[0].topping;
               document.getElementById("plain").innerHTML = myArr[1].quantity + " " + myArr[1].topping;
               document.getElementById("chocolate").innerHTML = myArr[2].quantity + " " + myArr[2].topping;
            }
            // else {
            //    document.getElementById("cherry").innerHTML = originalCherryText;
            //    document.getElementById("chocolate").innerHTML = originalChocolateText;
            //    document.getElementById("plain").innerHTML = originalPlainText;
            // }
            // Puts in original data back if a different month (not march) is selected
         };
         xmlhttp.open("POST", "/orders", true);
         xmlhttp.send();
 
      });
 
    });
 
 });