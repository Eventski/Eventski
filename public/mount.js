$(document).ready(function() {

$.ajax(mountainCall);

$("#map").hide();
$('#submit').click(function() {
   $('#map').show();
 });

});//end of document.ready
var mountains = []
var mountainCall = {
  type: 'get',
  url: '/mountains/mountain',
  dataType: 'json',
  success: function(data) {
    console.log("hello");
    console.log(data);
    mountains.push(data);
  }
}


  $('#submit').onclick = function (){
     $('#map').show();
   };
