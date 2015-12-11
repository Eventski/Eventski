$(document).ready(function() {

$.ajax(mountainCall);

$("#map").css('display', 'none');
$("#btn").css('display', 'none');

$("#btn").click(function() {
  selectMountain();
  buildClickableList(mountainsInRange);
});

});//end of document.ready

var latitude = 0;
var longitude = 0;
var selectMountainLat = 0;
var selectMountainLong = 0;
var countMountains =0;
var countShows = 0;
var selectMountainName = '';
var tempArr = [];
var showsArr =[];
var mountainsInRange = [];
var markers = [];
var mountainsArr = [];
var markersMapArr = [];
var map;


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
  zoom: 8,
  center: {lat: 44.4753, lng: -72.7022}
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

function selectMountain(){
  for (var i = 0; i < mountainsArr.length; i++) {
     var localCity = mountainsArr[i].mountain_city;
     var localLat = mountainsArr[i].mountain_lat;
     var localLong = mountainsArr[i].mountain_long;
     var localName = mountainsArr[i].name;
     var localState = mountainsArr[i].state;
     var localUrl = mountainsArr[i].url;
     var absLat = Math.abs(localLat - latitude);
     var absLong = Math.abs(localLong - longitude);
    //  console.log(mountainsArr[i].name + 'lat: ' + mountainsArr[i].mountain_lat + mountainsArr[i].mountain_long);
         if (absLat <= 0.9 && absLong <= 0.9) {
           mountainsInRange.push(mountainsArr[i]);
           addMarker(localLat,localLong, localName);
         }
      }
  showMarkers();
}


function addMarker(x,y,z){
  var myLatLng = {lat: parseFloat(x), lng: parseFloat(y)};
  var name = z;
  markers.push(myLatLng);
  console.log(markers.length);
}

function showMarkers(){
  for (var i=0; i <markers.length; i++){
    markersMapArr.push(
      marker = new google.maps.Marker({
        position: markers[i],
        position: new google.maps.LatLng(mountainsInRange[i].mountain_lat,mountainsInRange[i].mountain_long),
        map: map,
        title: mountainsInRange[i].mountain_name,
        animation: google.maps.Animation.DROP
        }))
      var infowindow = new google.maps.InfoWindow({
        content: mountainsInRange[i].mountain_name
      });
      // markersMapArr[i].addEventListener('click', function(){
      //   info.open(map, marker);
      // });
        // ;
      }
}

function buildClickableList(arrayOfMountains) {
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
     $('body').append("<li><a href='events/" + arrayOfMountains[i].id + "'</a>"+ arrayOfMountains[i].mountain_name + '</li>')
  }

}

//function to be run when mountain button is selected. This sets global 'selectMountainLat' and Long
//so that songkickFunction can pull these coordinates
function chooseOne(x){
  var x = x-1;
  var currentMountain = new Object();
  currentMountain.latitude = mountainsInRange[x][0];
  currentMountain.longitude = mountainsInRange[x][1];
  currentMountain.name = mountainsInRange[x][2];
  selectMountainLat = currentMountain.latitude;
  selectMountainLong = currentMountain.longitude;
  selectMountainName = currentMountain.name;
}


// function songkickFunction(){
//   $.getJSON("http://api.songkick.com/api/3.0/events.json?location=geo:" + selectMountainLat + "," + selectMountainLong + "&apikey=NGGZAUSLFDnYDLrV&jsoncallback=?",
//   function(data){
//     console.log('songkick runs');
//     console.log('lat' + selectMountainLat);
//     console.log('lat' + selectMountainLong);
//     //
//     // var titleNode = document.getElementById("titleID");
//     // titleNode.innerHTML = '';
//     // $('#titleID').append('</p><strong><div>'+'shows near ' + selectMountainName + '</div></strong></p>');
//
//     var titleNode = document.getElementById("titleId");
//     titleNode.innerHTML = '';
//     $('#titleId').append('</p><strong><div>'+'shows near ' + selectMountainName + '</div></strong></p>');
//
//     var showsNode = document.getElementById("showsID");
//     showsNode.innerHTML = '';
//
//     for (i=0; i< data.resultsPage.totalEntries; i++){
//       countShows = countShows + 1;
//       var name = data.resultsPage.results.event[i].performance[0].artist.displayName;
//       var date = data.resultsPage.results.event[i].start.date;
//       var location = data.resultsPage.results.event[i].location.city;
//       var tempArr = [];
//       ///////
//       var element = document.createElement("input");
//       element.className = 'showButtonClass'
//       element.id = countShows;
//       element.type = 'button';
//       element.name = 'selectShowsButton';
//       element.value = 'select';
//       element.onclick = function (){
//          addShow(this.id);
//        };
//       ///////
//       console.log(element.className, element.id, element.type, element.name, element.value);
//       tempArr.push(name, date, location, tempArr);
//       showsArr.push(tempArr);
//       // $('#showsID').append('<div>'+tempArr+'</div>');
//       $('#showsID').append(element);
//       $('#showsID').append('<div>'+ tempArr+'</div>');
//     }
//   });
// }
//
// function addShow(x){
//   var x = x -1;
//   var currentShow = showsArr[x][0];
//   alert(currentShow + ' added');
// }
