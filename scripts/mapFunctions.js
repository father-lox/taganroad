//Функция, отвечающая за клик по карте

map.on('click', function(e) {

    if (checkSave) {

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

function CreateRoute() {


    var startCoordinates = [];
    var endCoordinates = [];
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
            var request = new XMLHttpRequest();
            request.open('GET', `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248d682833474fb4806ad8717782a657f2c&start=${startCoordinates[1]},%20${startCoordinates[0]}&end=${endCoordinates[1]},%20${endCoordinates[0]}`);
            request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
            request.onreadystatechange = function () {
            if (this.readyState === 4) {
                var routeObj = JSON.parse(this.responseText);
                for (i in routeObj.features[0].geometry.coordinates) {
                    var temp = routeObj.features[0].geometry.coordinates[i][0];
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


                var polyline = L.polyline(routeObj.features[0].geometry.coordinates, {color: 'green'}).addTo(map);
                var svgAlphaA = '<img src="./img/alpha-pointer-A.svg" height="40" width="40">';
                var iconAlphaA = L.divIcon({ html: svgAlphaA, className: 'alpha-pointer-css', iconAnchor: [20,39]  });
                //map._panes.markerPane.remove();
                L.marker(routeObj.features[0].geometry.coordinates[0], { icon: iconAlphaA }).addTo(map);
                var svgAlphaB = '<img src="./img/alpha-pointer-B.svg" height="40" width="40">';
                var iconAlphaB = L.divIcon({ html: svgAlphaB, className: 'alpha-pointer-css',  iconAnchor: [20,39]    });
                L.marker(routeObj.features[0].geometry.coordinates[routeObj.features[0].geometry.coordinates.length - 1], { icon: iconAlphaB }).addTo(map);
                map.fitBounds(polyline.getBounds());
            }};
            request.send();
                }, 500);
}