$(document).ready(function() {

$.ajax(mountainCall);

$("#map").css('display', 'none');
$("#btn").css('display', 'none');

$("#btn").click(function() {
  selectMountain();
  buildClickableList(mountainsInRange);
});



});//end of document.ready
//initMap(selectMountain);
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
    // console.log(data);
    // mountainsArr.push(data);
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
    //  console.log(mountainsArr[i].name + 'lat: ' + mountainsArr[i].mountain_lat + mountainsArr[i].mountain_long);
         if (absLat <= 0.5 && absLong <= 0.5) {
           mountainsInRange.push(mountainsArr[i]);
         }
       }
     }

           //break;
          //  countMountains = countMountains + 1;
//            var element = document.createElement("input");
//            var mtnId = mountainsArr[i].id;
//            element.className = 'mountainsClass'
//           //  element.id = mtnId;
//            console.log(mtnId);
//            element.type = 'button';
//            element.name = 'selectButton';
//            element.value = 'select';
//            element.onclick = function (){
//               location.href = "events/"+mtnId;
//             };
//            $('#mountainsId').append(element);
//            $('#mountainsId').append('<div>'+ localName+'</div>');
//            console.log(localName + '--------')
//            console.log('manual lat: ' + localLat);
//            console.log('manual long: ' + localLong);
//         //  var tempArr = [];
//         //  tempArr.push(localLat, localLong, localName);
//         //  mountainsInRange.push(tempArr);
//          }
//   }
//   return mountainsInRange;
//
// }

function buildClickableList(arrayOfMountains) {
  for (var i = 0; i < arrayOfMountains.length; i++) {
     $('body').append("<li><a href='events/" + arrayOfMountains[i].id + "'</a>"+ arrayOfMountains[i].mountain_name + '</li>')
  }
  // create li's
  // append to DOM
  // loop through
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


function songkickFunction(){
  $.getJSON("http://api.songkick.com/api/3.0/events.json?location=geo:" + selectMountainLat + "," + selectMountainLong + "&apikey=NGGZAUSLFDnYDLrV&jsoncallback=?",
  function(data){
    console.log('songkick runs');
    console.log('lat' + selectMountainLat);
    console.log('lat' + selectMountainLong);
    //
    // var titleNode = document.getElementById("titleID");
    // titleNode.innerHTML = '';
    // $('#titleID').append('</p><strong><div>'+'shows near ' + selectMountainName + '</div></strong></p>');

    var titleNode = document.getElementById("titleId");
    titleNode.innerHTML = '';
    $('#titleId').append('</p><strong><div>'+'shows near ' + selectMountainName + '</div></strong></p>');

    var showsNode = document.getElementById("showsID");
    showsNode.innerHTML = '';

    for (i=0; i< data.resultsPage.totalEntries; i++){
      countShows = countShows + 1;
      var name = data.resultsPage.results.event[i].performance[0].artist.displayName;
      var date = data.resultsPage.results.event[i].start.date;
      var location = data.resultsPage.results.event[i].location.city;
      var tempArr = [];
      ///////
      var element = document.createElement("input");
      element.className = 'showButtonClass'
      element.id = countShows;
      element.type = 'button';
      element.name = 'selectShowsButton';
      element.value = 'select';
      element.onclick = function (){
         addShow(this.id);
       };
      ///////
      console.log(element.className, element.id, element.type, element.name, element.value);
      tempArr.push(name, date, location, tempArr);
      showsArr.push(tempArr);
      // $('#showsID').append('<div>'+tempArr+'</div>');
      $('#showsID').append(element);
      $('#showsID').append('<div>'+ tempArr+'</div>');
    }
  });
}

function addShow(x){
  var x = x -1;
  var currentShow = showsArr[x][0];
  alert(currentShow + ' added');
}
