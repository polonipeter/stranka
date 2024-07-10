// Initialize Leaflet map
var map = L.map('map').setView([48.148, 17.106], 10); // Adjusted zoom level and center for Slovakia

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Define the boundaries of Bratislava
var southWest = L.latLng(48.1, 17.0),
    northEast = L.latLng(48.2, 17.2),
    bounds = L.latLngBounds(southWest, northEast);

// Generate random markers within Bratislava
var markers = [];
var numberOfMarkers = 20;

for (var i = 0; i < numberOfMarkers; i++) {
    var lat = getRandomNumber(southWest.lat, northEast.lat);
    var lng = getRandomNumber(southWest.lng, northEast.lng);
    var companyName = 'Company Bratislava' + (i + 1);
    var marker = L.marker([lat, lng]).addTo(map).bindPopup(companyName);
    markers.push(marker);
    marker.on('mouseover', function(e) {
        this.openPopup();
    });
    marker.on('mouseout', function(e) {
        this.closePopup();
    });
}

// Function to get random number within a range
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Define the boundaries of Trnava
var trnavaSouthWest = L.latLng(48.3, 17.5),
    trnavaNorthEast = L.latLng(48.4, 17.7),
    trnavaBounds = L.latLngBounds(trnavaSouthWest, trnavaNorthEast);

// Generate random markers within Trnava
var trnavaMarkers = [];
var numberOfTrnavaMarkers = 10;

for (var j = 0; j < numberOfTrnavaMarkers; j++) {
    var trnavaLat = getRandomNumber(trnavaSouthWest.lat, trnavaNorthEast.lat);
    var trnavaLng = getRandomNumber(trnavaSouthWest.lng, trnavaNorthEast.lng);
    var companyName = 'Company Trnava' + (j + 1);
    var trnavaMarker = L.marker([trnavaLat, trnavaLng]).addTo(map).bindPopup(companyName);
    trnavaMarkers.push(trnavaMarker);
    trnavaMarker.on('mouseover', function(e) {
        this.openPopup();
    });
    trnavaMarker.on('mouseout', function(e) {
        this.closePopup();
    });
}

// Define the boundaries of Nitra
var nitraSouthWest = L.latLng(48.3, 18.0),
    nitraNorthEast = L.latLng(48.4, 18.2),
    nitraBounds = L.latLngBounds(nitraSouthWest, nitraNorthEast);

// Generate random markers within Nitra
var nitraMarkers = [];
var numberOfNitraMarkers = 10;

for (var k = 0; k < numberOfNitraMarkers; k++) {
    var nitraLat = getRandomNumber(nitraSouthWest.lat, nitraNorthEast.lat);
    var nitraLng = getRandomNumber(nitraSouthWest.lng, nitraNorthEast.lng);
    var companyName = 'Company Nitra' + (k + 1);
    var nitraMarker = L.marker([nitraLat, nitraLng]).addTo(map).bindPopup(companyName);
    nitraMarkers.push(nitraMarker);
    nitraMarker.on('mouseover', function(e) {
        this.openPopup();
    });
    nitraMarker.on('mouseout', function(e) {
        this.closePopup();
    });
}