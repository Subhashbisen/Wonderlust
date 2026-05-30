const mapCordinates  = coordinates;

// console.log(mapCordinates[0]); // check

// Pimpri-Chinchwad location
var map = L.map("map").setView([mapCordinates[1], mapCordinates[0]], 13);

// console.log(coordinates);

// OSM tiles (FREE)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  // attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Custom Airbnb-style marker
var homeIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
  iconSize: [30, 30],
});

L.marker([mapCordinates[1], mapCordinates[0]], { icon: homeIcon })
  .addTo(map)
  .bindPopup("My Listing 🏠")
  .openPopup();
