$(document).ready(function() {

$.ajax(mountainCall);

// $("#map").css('display', 'none');
// $("#btn").css('display', 'none');
$('#map').css('display', 'block');
$('#btn').css('display', 'block');

$("#btn").click(function() {
  // initMap();
  selectMountain();
  buildClickableList(mountainsInRange);
});

});//end of document.ready

var latitude = 0;
var longitude = 0;
var mountainsInRange = [];
var markers = [];
var mountainsArr = [];
var map;

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


//////////////////////
function initMap() {
  console.log('new maps function works');
  var myLatLng = {lat: 44.4753, lng: -72.7022}; //set starting location
  map = new google.maps.Map(document.getElementById('map'), { //make new map and tie to dom
    zoom: 6,
    center: myLatLng
  });
  document.getElementById('submit').addEventListener('click', function() { //when searching location, run function
        geocodeAddress(geocoder, map);
        google.maps.event.trigger(map, 'resize'); map.setCenter(center);
    });
  var geocoder = new google.maps.Geocoder();
  var center = map.getCenter();

  var contentString = 'starting position: stowe, vt';
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
  marker.addListener('click',function(){
    infowindow.open(map, marker);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
  if (status === google.maps.GeocoderStatus.OK) {
    resultsMap.setCenter(results[0].geometry.location);
    console.log(results[0].geometry.location);
    var marker = new google.maps.Marker({
      map: resultsMap,
      position: results[0].geometry.location
    });
    longitude = results[0].geometry.location.lng();
    latitude = results[0].geometry.location.lat();
  } else {
    alert('Geocode was not successful for the following reason: ' + status);
  }
  });
}


function selectMountain(){ //function run when searching for mountains button is clicked

  for (i=0; i< markers.length; i++){
    markers[i].setMap(null)
  };
  mountainsInRange = [];
  // markers[i].setMap(map)
  for (var i = 0; i < mountainsArr.length; i++) {
     var localCity = mountainsArr[i].mountain_city;
     var localLat = mountainsArr[i].mountain_lat;
     var localLong = mountainsArr[i].mountain_long;
     var localName = mountainsArr[i].name;
     var localState = mountainsArr[i].state;
     var localUrl = mountainsArr[i].url;
     var absLat = Math.abs(localLat - latitude);
     var absLong = Math.abs(localLong - longitude);

         if (absLat <= 0.4 && absLong <= 0.4) {
           mountainsInRange.push(mountainsArr[i]);
           addMarker(mountainsArr[i].mountain_lat, mountainsArr[i].mountain_long, mountainsArr[i].mountain_name);
         }
      }
  console.log(latitude, ";", longitude);
}

function addMarker(x,y,z){
  console.log(x,y,z);
  var contentString = z;
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  var marker = new google.maps.Marker({
    position: {lat: parseFloat(x), lng: parseFloat(y)},
    map: map,
    title: 'Hello World!'
  });
  marker.addListener('click',function(){
    infowindow.open(map, marker);
  });
  // markers.push(marker);
}

function buildClickableList(arrayOfMountains) {
  $('.mtn_list').empty();
  var countMountainButton = 0;
  for (var i = 0; i < arrayOfMountains.length; i++) {
    var element = document.createElement("input");
    element.className = 'mountainMapClass'
    element.id = countMountainButton;
    element.type = 'button';
    element.name = 'selectShowsButton';
    element.value = 'select';
    element.onclick = function (){
       addShow(this.id);
     };
     $('.mtn_list').append("<li class='mtns'><a href='events/" + arrayOfMountains[i].id + "'</a>"+ arrayOfMountains[i].mountain_name + '</li>')
  }

}
