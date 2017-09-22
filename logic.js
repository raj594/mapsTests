var map;
var service;
var infowindow;
var austin;

function initialize() {
  austin = new google.maps.LatLng(30.2672,-97.7431);

  map = new google.maps.Map(document.getElementById('map'), {
      center: austin,
      zoom: 15
    });

  var request = {
    location: austin,
    radius: '500',
    query: 'restaurant'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  map.panTo(place.geometry.location);
  // console.log(place.geometry.location)
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  infowindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Place ID: ' + place.place_id + '<br>' +
          place.formatted_address + '</div>');
      infowindow.open(map, this);
  });
}


$('#pick-restaurant').on('click', function(event){
  event.preventDefault();

  var place = $('#restaurant').val().trim()
  var radius = $('#radius').val().trim()
  console.log(place)
  console.log(radius)
  var request = {
    location: austin,
    radius: radius,
    query: place
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

});