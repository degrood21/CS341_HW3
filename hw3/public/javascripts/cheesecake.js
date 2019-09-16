/*Helps to wait to run functions once the document fully loads*/
//$(document).ready(function(){ 

    //$(document).ready(function(){
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
 
      });
 
    //});
 
 //});