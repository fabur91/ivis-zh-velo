/* Sticky Header start */
var header = document.getElementById("header");
var sticky = header.offsetTop;

document.onscroll = function() {
        if (window.pageYOffset > sticky) {
            header.classList.add("fixed-top");
        } else {
            header.classList.remove("fixed-top");
        }
    };
/* Sicky Header end */



var map = L.map('map').setView([47.3686498, 8.5391825], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    minZoom: 12,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZmFiaWFuYnVyIiwiYSI6ImNrOGQxcnVtdDBxdDEzcHFwN3BzZDh0d2sifQ.RZ1FydXU6FKtGo34haa5nQ'
}).addTo(map);

d3.csv("./data/motorisiert_zaehler_pro_jahr.csv").then(function(data) {
    for (var i = 0; i < data.length; i++) {
        var lon = (data[i].EKoord - 2678023.77) * 0.0000132 + 8.472;
        var lat = (data[i].NKoord - 1242969.91) * 0.0000091 + 47.3318;
        var circle = L.circle([lat, lon], {
            color: 'yellow',
            fillColor: '#fd3',
            fillOpacity: 0.5,
            radius: data[i].MotAvrg * 3
        })
            .bindPopup(data[i].bezeichnung + '<br>Motorisierte Fahrzeuge/h: ' + Math.round(data[i].MotAvrg*4))
            // .bindPopup(data[i].bezeichnung + '<br>lat: ' + lat + ', lon: ' + lon)
            .addTo(map);
    }
});

d3.csv("./data/zuerivelo_publibike.csv").then(function(data) {
    for (var i = 0; i < data.length; i++) {
        var circle = L.circle([data[i].lat, data[i].lon], {
            color: 'blue',
            fillColor: '#30f',
            fillOpacity: 0.5,
            radius: 5
        })
            .bindPopup(data[i].name)
            .addTo(map);
    }
});

d3.csv("./data/velo_fuss_zh_zaehler_pro_jahr.csv").then(function(data) {
    for (var i = 0; i < data.length; i++) {
        var circle = L.circle([data[i].lat, data[i].lon], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: data[i].VeloInAvrg * 3
        })
            .bindPopup(data[i].bezeichnung + '<br>Velos/h: ' + Math.round(data[i].VeloInAvrg*4))
            .addTo(map);
    }
});

map.setMaxBounds([
    [47.33, 8.63],
    [47.46, 8.46]
]);
