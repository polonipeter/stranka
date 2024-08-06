// Initialize Leaflet map

var slovakiaSouthWest = L.latLng(47.6, 16.8),
    slovakiaNorthEast = L.latLng(49.6, 22.6),
    slovakiaBounds = L.latLngBounds(slovakiaSouthWest, slovakiaNorthEast);


var map = L.map('map', {
    center: [48.75, 19.5], // Centered approximately in Slovakia
    zoom: 8, // Adjusted zoom level for Slovakia view
    
    maxBoundsViscosity: 1.0, // Ensure the map doesn't move outside the bounds
    zoomControl: false, // Disable zoom control initially
    dragging: false,     // Disable dragging initially
    doubleClickZoom: false, // Disable double click zoom initially
    scrollWheelZoom: false  // Disable scroll wheel zoom initially
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Define custom icons
var AlbasecIcon = L.icon({
    iconUrl: 'img/logo/Albasec-logo2.png',
    iconSize: [22, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// Define the boundaries of Bratislava
var southWest = L.latLng(48.1, 17.0),
    northEast = L.latLng(48.2, 17.2),
    bounds = L.latLngBounds(southWest, northEast);

// Function to get random number within a range
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to add markers with custom icons
function addMarkers(bounds, numberOfMarkers, icon, prefix) {
    for (var i = 0; i < numberOfMarkers; i++) {
        var lat = getRandomNumber(bounds.getSouthWest().lat, bounds.getNorthEast().lat);
        var lng = getRandomNumber(bounds.getSouthWest().lng, bounds.getNorthEast().lng);
        var companyName = prefix + (i + 1);
        var marker = L.marker([lat, lng], { icon: icon }).addTo(map).bindPopup(companyName);
        marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });
    }
}

var bratislavaBounds = L.latLngBounds(L.latLng(48.1, 17.0), L.latLng(48.2, 17.2));
addMarkers(bratislavaBounds, 20, AlbasecIcon, 'Company Bratislava');

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

map.once('click', function() {
    // Enable zoom control, dragging, double click zoom, and scroll wheel zoom
    map.zoomControl = L.control.zoom({ position: 'topright' });
    map.addControl(map.zoomControl);
    map.dragging.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
});