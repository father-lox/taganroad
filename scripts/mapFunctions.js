"use strict";
(function () {

//Функция, отвечающая за клик по карте

map.on('click', function(e) {

    if (document.getElementById('buttonB').getAttribute('saved') == "false") {

        document.getElementById('buttonB').classList.add("active-tab");
        document.getElementById('buttonB').classList.add("active-tab-item");
        document.getElementById('buttonB').classList.remove("clear-field");

        document.getElementById('buttonB').textContent = "save";
        let googleGeocoderUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latlng.lat},${e.latlng.lng}&key=AIzaSyDxvXuznL3aWv-ISWr9I5nPIcI5Pv0jWgU`;
                fetch(googleGeocoderUrl)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('to').value = data.results[0].address_components[1].long_name + ', ' + data.results[0].address_components[0].short_name;
                    } )
                .catch(err=> console.warn(err.message));
            }
});

//Ф-ия, создающая маршрут

document.getElementById("buttonCreateRoute").addEventListener("click", CreateRoute);


function CreateRoute() {

    let startCoordinates = [];
    let endCoordinates = [];
    const geocoder = new google.maps.Geocoder();
    const startAddress = document.getElementById("from").value + " Таганрог";
    const endAddress = document.getElementById("to").value + " Таганрог";

    geocoder.geocode({
        address: startAddress
        },
        (results, status) => {
            startCoordinates[0] = results[0].geometry.location.lat();
            startCoordinates[1] = results[0].geometry.location.lng();

            });

    geocoder.geocode({
        address: endAddress
        },
        (results, status) => {
            endCoordinates[0] = results[0].geometry.location.lat();
            endCoordinates[1] = results[0].geometry.location.lng();

            });   

        setTimeout(function() {
            let requestHeaderFirstAttribute = 'Accept';
            let requestHeaderSecondAttribute = 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8';
            let request = new XMLHttpRequest();
            request.open('GET', `https://api.openrouteservice.org/v2/directions/cycling-regular?api_key=5b3ce3597851110001cf6248d682833474fb4806ad8717782a657f2c&start=${startCoordinates[1]},%20${startCoordinates[0]}&end=${endCoordinates[1]},%20${endCoordinates[0]}`);
            request.setRequestHeader(requestHeaderFirstAttribute, requestHeaderSecondAttribute);
            request.onload = function () {
              
                if (this.status == 200 ) {
                   
                  
                let routeObj = JSON.parse(this.responseText);
                let i;
                for (i in routeObj.features[0].geometry.coordinates) {
                    let temp = routeObj.features[0].geometry.coordinates[i][0];
                    routeObj.features[0].geometry.coordinates[i][0] =  routeObj.features[0].geometry.coordinates[i][1];
                    routeObj.features[0].geometry.coordinates[i][1] = temp;
                }


                for(i in map._layers) {
                    map.eachLayer((layer) => {
                        if (layer._url != 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png') {
                            layer.remove();
                        }
                    });
                }


                let polyline = L.polyline(routeObj.features[0].geometry.coordinates, {color: 'green'}).addTo(map);
                let svgAlphaA = '<img src="./img/alpha-pointer-A.svg" height="40" width="40">';
                let iconAlphaA = L.divIcon({ html: svgAlphaA, className: 'alpha-pointer-css', iconAnchor: [20,39]  });
                let markerA =  L.marker(routeObj.features[0].geometry.coordinates[0], { icon: iconAlphaA });
                let animatedMarkerCreationStyles = ["animate__animated", "animate__zoomIn", "animate__fast"]
                markerA.on('add', function() {
                    markerA._icon.classList.add(...animatedMarkerCreationStyles);
                });
                markerA.addTo(map);
                let svgAlphaB = '<img src="./img/alpha-pointer-B.svg" height="40" width="40">';
                let iconAlphaB = L.divIcon({ html: svgAlphaB, className: 'alpha-pointer-css',  iconAnchor: [20,39]    });
                let markerB = L.marker(routeObj.features[0].geometry.coordinates[routeObj.features[0].geometry.coordinates.length - 1], { icon: iconAlphaB });
                markerB.on('add', function() {
                    markerB._icon.classList.add(...animatedMarkerCreationStyles);
                });
                markerB.addTo(map);
                map.fitBounds(polyline.getBounds());
            }
            else {
                alert('Сервер не отвечает , попробуйте еще раз. Статус ошибки ' + this.status);
                return 0;
            }};
            request.send();
                }, 800);
}
}());