$(document).ready(function() {


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 8,
  center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
  geocodeAddress(geocoder, map);
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

var latitude = 0;
var longitude = 0;
var selectMountainLat = 0;
var selectMountainLong = 0;
var showsArr =[];

// var sugarbush = {name: "sugarbush",lat: 44.1069,long: -72.8581};
// var stowe = {name: "stowe",lat: 44.4753,long: -72.7022};
// var killington = {name: "killington",lat: 43.6236,long: -72.7933};
// var wildcat = {name: "wildcat",lat: 44.3878 ,long: -71.1731};
// var whaleback = {name: "whaleback" ,lat: 43.6417,long: -72.1453};
// var tuckerman = {name: "tuckerman" ,lat: 44.2625,long: -71.2983};
// var stratton = {name: "stratton",lat: 43.0614,long:-72.9042};
// var mountSnow = {name: "mountSnow",lat: 42.9589 ,long: -72.9236};
// var middlebury = {name: "middlebury",lat: 44.0019,long: -73.1456};
// var magicMountain = {name: "magicMountain",lat: 42.1928,long:-72.7600};
// var jayPeak = {name: "jaypeak",lat: 44.9650,long: -72.4597};
// var attitash = {name: "attitash",lat: 44.0822,long: -71.2297};
// var bolton = {name: "bolton",lat: 44.4158,long: -72.8697};
//
// var mountainsArr = [sugarbush, stowe, killington, wildcat, whaleback, tuckerman, stratton, mountSnow, middlebury, magicMountain, jayPeak, attitash, bolton];
var mountainsInRange = [];
var countMountains =0;
var countShows = 0;
var selectMountainName = '';





function selectMountain(){
  var mountainsNode = document.getElementById("mountainsID");
  mountainsNode.innerHTML = '';
  mountainsInRange = [];
  console.log('google place lat: '+ latitude);
  console.log('google place long: '+ longitude);
  for (var i = 0; i < mountainsArr.length; i++) {
     var localLat = mountainsArr[i].lat;
     var localLong = mountainsArr[i].long;
     var localName = mountainsArr[i].name;
     var absLat = Math.abs(localLat - latitude);
     var absLong = Math.abs(localLong - longitude);
    //  console.log(mountainsArr[i].name + 'lat: ' + mountainsArr[i].lat + mountainsArr[i].long);
         if (absLat <= 0.5 && absLong <= 0.5) {
           countMountains = countMountains + 1;
           var element = document.createElement("input");
           element.className = 'mountainsClass'
           element.id = countMountains;
           element.type = 'button';
           element.name = 'selectButton';
           element.value = 'select';
           element.onclick = function (){
              chooseOne(this.id);
            };
           $('#mountainsID').append(element);
           $('#mountainsID').append('<div>'+ localName+'</div>');
           console.log(localName + '--------')
           console.log('manual lat: ' + localLat);
           console.log('manual long: ' + localLong);
         var tempArr = [];
         tempArr.push(localLat, localLong, localName);
         mountainsInRange.push(tempArr);
         }
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


function songkickFunction(){
  $.getJSON("http://api.songkick.com/api/3.0/events.json?location=geo:" + selectMountainLat + "," + selectMountainLong + "&apikey=NGGZAUSLFDnYDLrV&jsoncallback=?",
  function(data){

    var titleNode = document.getElementById("titleID");
    titleNode.innerHTML = '';
    $('#titleID').append('</p><strong><div>'+'shows near ' + selectMountainName + '</div></strong></p>');
    var showsNode = document.getElementById("showsID");
    showsNode.innerHTML = '';
    // console.log(data);
    // console.log('mountain lat: ' + selectMountainLat);
    // console.log('mountain long: ' + selectMountainLong);
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

});//end of document.ready
