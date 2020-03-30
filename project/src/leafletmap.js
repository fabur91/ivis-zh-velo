/* Sticky Header start */
var header = document.getElementById("header");
var sticky = header.offsetTop;

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    console.log(scrolled);
        console.log(window.pageYOffset);
        console.log(sticky);
        if (window.pageYOffset > sticky) {
            header.classList.add("fixed-top");
        } else {
            header.classList.remove("fixed-top");
        }
    }
);
/* Sicky Header stop */

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

d3.csv("./data/velo_fuss_zh_zaehler_pro_jahr.csv").then(function(data) {
    for (var i = 1; i < data.length; i++) {
        var circle = L.circle([data[i].lat, data[i].lon], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: data[i].VeloInAvrg * 20
        })
            .bindPopup(data[i].bezeichnung + '<br>Velos/h: ' + Math.round(data[i].VeloInAvrg*4))
            .addTo(map);
    }
});

d3.csv("./data/zuerivelo_publibike.csv").then(function(data) {
    for (var i = 1; i < data.length; i++) {
        var circle = L.circle([data[i].lat, data[i].lon], {
            color: 'blue',
            fillColor: '#30f',
            fillOpacity: 0.5,
            radius: 50
        })
            .bindPopup(data[i].name)
            .addTo(map);
    }
});

map.setMaxBounds([
    [47.33, 8.63],
    [47.46, 8.47]
]);
