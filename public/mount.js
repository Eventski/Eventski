$(document).ready(function() {

$.ajax(mountainCall);
// plugIn();

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

// function plugIn() {
// var mtSearch = $("#search");
// $("#address").val(mtSearch);
// }
