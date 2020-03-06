// votre code JS


var mymap = L.map('mapid').setView([48.8562368, 2.3078572], 10);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoianVsaWVua29tcCIsImEiOiJjanR1NGFuYjkxMmNvNDBucGI1aXZ4Y285In0.hiSplFD5CODUd9yxRO_qkg'
}).addTo(mymap);


var marker = L.marker([48.8612442, 2.3398124]).addTo(mymap);
var marker2 = L.marker([48.85770034790039, 2.2957828044891357]).addTo(mymap);
// var circle = L.circle([48.85770034790039, 2.2957828044891357], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(mymap);

// var polygon = L.polygon([
//     [48.8562368, 2.3078572],
//     [48.8562368, 2.3078572],
//     [48.8562368, 2.3078572]
// ]).addTo(mymap);

marker.bindPopup("<b>Bienvenue</b><br>au Louvre").openPopup();
marker2.bindPopup("<b>Bienvenue</b><br>à la Tour Eiffel").openPopup();
// circle.bindPopup("La Tour Eiffel");
// polygon.bindPopup("I am a polygon.");

var popup = L.popup()
    .setLatLng([48.85770034790039, 2.2957828044891357])
    .setContent("La Tour Eiffel")
    .openOn(mymap);

    function onMapClick(e) {
        alert("Vous avez cliqué sur la carte à l'adresse " + e.latlng);
    }
    
    mymap.on('click', onMapClick);

    var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Vous avez cliqué sur la carte à l'adresse " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);