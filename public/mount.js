$(document).ready(function() {

$.ajax(mountainCall);

$("#map").css('display', 'none');
$("#btn").css('display', 'none');

$("#btn").click(function() {
  selectMountain();
  buildClickableList(mountainsInRange);
});



});//end of document.ready

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 8,
  center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();
  var center = map.getCenter();
  document.getElementById('submit').addEventListener('click', function() {
    $('#map').css('display', 'block');
    geocodeAddress(geocoder, map);
    google.maps.event.trigger(map, 'resize'); map.setCenter(center);
    $('#btn').css('display', 'block');

  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
  if (status === google.maps.GeocoderStatus.OK) {
    resultsMap.setCenter(results[0].geometry.location);
    var marker = new google.maps.Marker({
      map: resultsMap,
      position: results[0].geometry.location

    });
    longitude = results[0].geometry.location.lng();
    latitude = results[0].geometry.location.lat();
    // console.log('latitude: ' + results[0].geometry.location.lat());
    // console.log('longitude: ' + results[0].geometry.location.lng());
    // console.dir(results[0]);
  } else {
    alert('Geocode was not successful for the following reason: ' + status);
  }
  });
}

var mountainsArr = []
var mountainCall = {
  type: 'get',
  url: '/mountains/mountain',
  dataType: 'json',
  success: function(data) {
    console.log("hello");
    mountainsArr = (data);
    console.log(mountainsArr);
  }

}

var latitude = 0;
var longitude = 0;
var selectMountainLat = 0;
var selectMountainLong = 0;
var showsArr =[];


var mountainsInRange = [];
var countMountains =0;
var countShows = 0;
var selectMountainName = '';

var tempArr = [];



function selectMountain(){
  // var mountainsNode = document.getElementById("mountainsId");
  // mountainsNode.innerHTML = '';
  console.log('google place lat: '+ latitude);
  console.log('google place long: '+ longitude);
  for (var i = 0; i < mountainsArr.length; i++) {
    // console.log("mountains");
     var localLat = mountainsArr[i].mountain_lat;
     var localLong = mountainsArr[i].mountain_long;
    //  var localName = mountainsArr[i].mountain_name;
    //  var mtnId = mountainsArr[i].id;
     var absLat = Math.abs(localLat - latitude);
     var absLong = Math.abs(localLong - longitude);
         if (absLat <= 0.5 && absLong <= 0.5) {
           mountainsInRange.push(mountainsArr[i]);
         }
       }
     }


function buildClickableList(arrayOfMountains) {
  for (var i = 0; i < arrayOfMountains.length; i++) {
     $('.mtn_list').append("<li class='mtns'><a href='events/" + arrayOfMountains[i].id + "'</a>"+ arrayOfMountains[i].mountain_name + '</li>')
  }
  // create li's
  // append to DOM
  // loop through
}
