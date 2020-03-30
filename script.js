// votre code JS


var mymap = L.map('mapid').setView([48.8562368, 2.3078572], 10);
var layerGroup = L.layerGroup().addTo(mymap);

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




//récupérer les données de l'API : fonction
async function getData(query) {
  if(query == undefined) {
    query = "";
  };
	let url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=date_start+%3E%3D+%23now()+AND+date_start+%3C+%23now(months%3D1) + " + query + " &lang=FR&rows=50 &facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&facet=event&facet=facets";
  console.log(url);
  let response = await fetch(url);
    
  let data = await response.json();

  layerGroup.clearLayers();

  data.records.forEach(function(event) {
		// le titre de l'événement
    let title = event.fields.title;
    let cover_url = event.fields.cover_url;
    let price_type= event.fields.price_type; 
    let date_description= event.fields.date_description;
    let lead_text= event.fields.lead_text;
		// si jamais le champs latitude/longitude manque
		// on ignore cet événement
		if (!event.fields.lat_lon) {
			return;
    };

		// la latitude
		let latitude = event.fields.lat_lon[0];

		// la longitude
	  let longitude = event.fields.lat_lon[1];
		// on pourrait récupérer d'autres infos..

		// pour tester, on les affiche dans la console
		console.log(title + " " + latitude + " " + longitude);

        let marker = L.marker([latitude, longitude]);

        //afficher une pop up avec la fonction bindPopup
        let content = "Événement : " + "<br>" + "<br><div class='title'>" + title + "</div>" +
        "<br>" + "<img class='imgpop' src='" + cover_url + "'>"+ "<br>" + price_type + "<br>" + date_description + "<br>" + lead_text;
       marker.bindPopup(content).openPopup();
       console.log(event.fields)
        //..
     

        
        //ajouter à carte
        marker.addTo(layerGroup);

		// .. mais ce serait mieux de les afficher sur la carte !
    })
};

getData("concerts");

function onFormSubmit(event) {
  event.preventDefault();
  console.log("le formulaire a bien été envoyé");
  console.log(searchInput.value);
  getData(searchInput.value)
};

function onInputClick(event) {
  event.preventDefault();
  getData("classique");
}
function onInputClick1(event) {
  event.preventDefault();
  getData("jazz");
}
function onInputClick2(event) {
  event.preventDefault();
  getData("HIP HOP");
}