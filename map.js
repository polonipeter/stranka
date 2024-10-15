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

// Function to add a marker with a custom icon
function addMarker(lat, lng, icon) {
    var marker = L.marker([lat, lng], { icon: icon }).addTo(map)
    marker.on('mouseover', function (e) {
        this.openPopup();
    });
    marker.on('mouseout', function (e) {
        this.closePopup();
    });
}

// Coordinates for the specified towns
var towns = [
    { name: 'Bratislava', lat: 48.1486, lng: 17.1077 },
    { name: 'Senec', lat: 48.2195, lng: 17.3991 },
    { name: 'Šaľa', lat: 48.1517, lng: 17.8729 },
    { name: 'Sereď', lat: 48.2852, lng: 17.7265 },
    { name: 'Senica', lat: 48.6792, lng: 17.3663 },
    { name: 'Trenčín', lat: 48.8945, lng: 18.0444 },
    { name: 'Poprad', lat: 49.0598, lng: 20.2975 },
    { name: 'Prešov', lat: 48.9984, lng: 21.2394 },
    { name: 'Dolný Kubín', lat: 49.2096, lng: 19.3033 },
    { name: 'Trnava', lat: 48.3774, lng: 17.5872 },
    { name: 'Košice', lat: 48.7164, lng: 21.2611 },
    { name: 'Piešťany', lat: 48.5942, lng: 17.8265 },
    { name: 'Prievidza', lat: 48.7745, lng: 18.6247 },
    { name: 'Martin', lat: 49.0666, lng: 18.9228 },
    { name: 'Liptovský Mikuláš', lat: 49.0842, lng: 19.6115 },
    { name: 'Rovinka', lat: 48.0906, lng: 17.2231 },
    { name: 'Hron', lat: 48.5802, lng: 19.1255 },
    { name: 'Považská Bystrica', lat: 49.1222, lng: 18.4257 },
    { name: 'Banská Bystrica', lat: 48.7395, lng: 19.1532 },
    { name: 'Žilina', lat: 49.2231, lng: 18.7393 }
];

// Add markers to the map for each town
towns.forEach(function(town) {
    addMarker(town.lat, town.lng, AlbasecIcon);
});

map.once('click', function() {
    // Enable zoom control, dragging, double click zoom, and scroll wheel zoom
    map.zoomControl = L.control.zoom({ position: 'topright' });
    map.addControl(map.zoomControl);
    map.dragging.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
});
