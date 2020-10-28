"use strict";
(function () {
    let svgAlphaB = '<img src="./img/alpha-pointer-B.svg" height="40" width="40">';
    let iconAlphaB = L.divIcon({html: svgAlphaB, className: 'alpha-pointer-css', iconAnchor: [20, 39]});
    let svgAlphaA = '<img src="./img/alpha-pointer-A.svg" height="40" width="40">';
    let iconAlphaA = L.divIcon({html: svgAlphaA, className: 'alpha-pointer-css', iconAnchor: [20, 39]});
    let route11autobus = [[47.216469, 38.850586], [47.219157, 38.860872], [47.219120, 38.861489], [47.219430, 38.861848], [47.222758, 38.874187],[47.222762, 38.875941], [47.222791, 38.876247], [47.222602, 38.884175], [47.239735, 38.885139], [47.240092, 38.885090], [47.240204, 38.885299], [47.239287, 38.888234], [47.239480, 38.888260], [47.243989, 38.891384], [47.244237, 38.891352], [47.246392, 38.892863], [47.246538, 38.893174], [47.246527, 38.893522], [47.246137, 38.894064], [47.246254, 38.894322], [47.248404, 38.892871], [47.249085, 38.892892], [47.249147, 38.892860], [47.251829, 38.890906], [47.252128, 38.891062], [47.252510, 38.892290], [47.252623, 38.893299], [47.252466, 38.894586], [47.252106, 38.895643],[47.252845, 38.896453], [47.253318, 38.897140], [47.255334, 38.901145], [47.256856, 38.903747], [47.261857, 38.916958], [47.261937, 38.917393], [47.261405, 38.917768], [47.261303, 38.918251], [47.261798, 38.919442], [47.262038, 38.919539], [47.262432, 38.919142], [47.262534, 38.918761], [47.262042, 38.917495], [47.261936, 38.917398]];
    let poly11auto = L.polyline(route11autobus, {color: 'blue'});
    let points11auto = L.featureGroup([poly11auto]);
    let markerBpoint = L.layerGroup();

    let routeLayerGroup = L.featureGroup();
    let route31autobus = [[47.216561, 38.851076], [47.219145, 38.860695], [47.219181, 38.860937], [47.219108, 38.861500], [47.219298, 38.861811], [47.219433, 38.861881], [47.219589, 38.862331], [47.222780, 38.874189], [47.222751, 38.875890], [47.222804, 38.876239], [47.222612, 38.884274], [47.219172, 38.895240], [47.212995, 38.914517], [47.212332, 38.914577], [47.212106, 38.914868], [47.211877, 38.915520], [47.220323, 38.921405], [47.222980, 38.917294], [47.224019, 38.917964], [47.224335, 38.918135], [47.224618, 38.918102], [47.226474, 38.917236], [47.229487, 38.918220], [47.230249, 38.918190], [47.235664, 38.917149], [47.246162, 38.917743], [47.257146, 38.917971], [47.257892, 38.917971], [47.258090, 38.918073], [47.261036, 38.918092], [47.261315, 38.918281], [47.261788, 38.919450], [47.262014, 38.919519], [47.262421, 38.919164], [47.262525, 38.918683], [47.262026, 38.917496], [47.261826, 38.917431], [47.261358, 38.917810], [47.261299, 38.918249]];
    let poly31auto = L.polyline(route31autobus, {color: 'blue'});
    let points31auto = L.featureGroup([poly31auto]);

    let gpsPoint = L.layerGroup();
    let timer;
    function ShowGPSOnMap () {
        timer = setInterval(() => {
        
        var oReq = new XMLHttpRequest();
        oReq.onload = function() {
        let svgGps = '<img src="./img/alpha-bus.svg" height="40" width="40">';
        let iconGps = L.divIcon({html: svgGps, className: 'alpha-pointer-css', iconAnchor: [20, 39]});
        let obj = JSON.parse(this.responseText);
        console.log(this.responseText);
        let longitude = obj.longitude;
        let latitude = obj.latitude;
        let gpsMarker = L.marker([latitude, longitude], {icon: iconGps});
        gpsPoint.addLayer(gpsMarker);
        gpsPoint.addTo(map);
        gpsPoint.eachLayer(function (layer) {
                gpsPoint.removeLayer(layer);
            }); 
            gpsPoint.addLayer(gpsMarker);
        gpsPoint.addTo(map);
    };
    
        oReq.open("get", "gps/get_coordinates.php?id_transport=15", true);
        oReq.send();
    }, 2000);

}

    document.querySelectorAll(".body-list-item").forEach((item) => {
        item.addEventListener("click", function (e) {
            if(e.currentTarget.getAttribute("active1")== null) {
                e.currentTarget.setAttribute("active1","no");
                e.currentTarget.setAttribute("active2","no");

            }
            let autobusName =  e.currentTarget.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.innerHTML;

            if (e.currentTarget.getAttribute("active1") == "no" && e.currentTarget.getAttribute("active2") == "no") {
                e.currentTarget.setAttribute("active1","yes");
                console.log(1);

            }
            else if (e.currentTarget.getAttribute("active1") == "yes" && e.currentTarget.getAttribute("active2") == "yes") {
                e.currentTarget.setAttribute("active1","no");
                console.log(2);

            }
            else if (e.currentTarget.getAttribute("active1") == "yes" && e.currentTarget.getAttribute("active2") == "no") {
                switch (autobusName) {
                    case "№11 Автобус": 
                        points11auto.addLayer(poly11auto);
                        points11auto.addTo(map); 
                        map.fitBounds(points11auto.getBounds());
                        ShowGPSOnMap();

                        break;
                    case "№31 Автобус": 
                        points31auto.addLayer(poly31auto);
                        points31auto.addTo(map); 
                        map.fitBounds(points31auto.getBounds());
                        break;    
                }
                
                e.currentTarget.setAttribute("active1","yes");
                e.currentTarget.setAttribute("active2","yes");
                console.log(3);

            }
            else {
                console.log(4);
                let check = 0;
                for (let i = 0; i < e.currentTarget.parentElement.children.length; i++) {
                    if (e.currentTarget.parentElement.children[i].getAttribute("active1") == "yes" && e.currentTarget.parentElement.children[i].getAttribute("active2") == "yes" ) {
                        check++;
                    }
                }
                if (!check) {
                    switch (autobusName) {
                        case "№11 Автобус": 
                            points11auto.removeLayer(poly11auto);
                            clearInterval(timer);
                            gpsPoint.eachLayer(function (layer) {
                                    gpsPoint.removeLayer(layer);
                                }); 

                            break;
                        case "№31 Автобус": 
                            points31auto.removeLayer(poly31auto);
                            break;    
                    }
                }
                e.currentTarget.setAttribute("active1","no");
                e.currentTarget.setAttribute("active2","no");
            }


        });
    });

    document.querySelectorAll(".header-list").forEach((item) => {
        item.addEventListener("click", function (e) {
            console.log(e.currentTarget.lastElementChild.firstElementChild.innerHTML);
            if(e.currentTarget.getAttribute("active1")== null) {
                e.currentTarget.setAttribute("active1","no");
                e.currentTarget.setAttribute("active2","no");

            }

            if (e.currentTarget.getAttribute("active1") == "no" && e.currentTarget.getAttribute("active2") == "no") {
                e.currentTarget.setAttribute("active1","yes");
                console.log(1);

            }
            else if (e.currentTarget.getAttribute("active1") == "yes" && e.currentTarget.getAttribute("active2") == "yes") {
                e.currentTarget.setAttribute("active1","no");
                console.log(2);

            }
            else if (e.currentTarget.getAttribute("active1") == "yes" && e.currentTarget.getAttribute("active2") == "no") {
                switch (autobusName) {
                    case "№11 Автобус": 
                        points11auto.addLayer(poly11auto);
                        points11auto.addTo(map); 
                        map.fitBounds(points11auto.getBounds());
                        ShowGPSOnMap();

                        break;
                    case "№31 Автобус": 
                        points31auto.addLayer(poly31auto);
                        points31auto.addTo(map); 
                        map.fitBounds(points31auto.getBounds());
                        break;    
                }
                
                e.currentTarget.setAttribute("active1","yes");
                e.currentTarget.setAttribute("active2","yes");
                console.log(3);

            }
            else {
                console.log(4);
                let check = 0;
                for (let i = 0; i < e.currentTarget.parentElement.children.length; i++) {
                    if (e.currentTarget.parentElement.children[i].getAttribute("active1") == "yes" && e.currentTarget.parentElement.children[i].getAttribute("active2") == "yes" ) {
                        check++;
                    }
                }
                if (!check) {
                    switch (autobusName) {
                        case "№11 Автобус": 
                            points11auto.removeLayer(poly11auto);
                            clearInterval(timer);
                            gpsPoint.eachLayer(function (layer) {
                                    gpsPoint.removeLayer(layer);
                                }); 

                            break;
                        case "№31 Автобус": 
                            points31auto.removeLayer(poly31auto);
                            break;    
                    }
                }
                e.currentTarget.setAttribute("active1","no");
                e.currentTarget.setAttribute("active2","no");
            }


        });
    });


//Функция, отвечающая за клик по карте

    map.on('click', function (e) {
        let markerB = L.marker(e.latlng, {icon: iconAlphaB});
        markerBpoint.eachLayer(function (layer) {
            markerBpoint.removeLayer(layer);
        });

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
                    markerBpoint.addLayer(markerB);
                    markerBpoint.addTo(map);
                })
                .catch(err => console.warn(err.message));
        }
    });

//Ф-ия, создающая маршрут

    document.getElementById("buttonCreateRoute").addEventListener("click", CreateRoute);


    function CreateRoute() {
        
        routeLayerGroup.eachLayer(function (layer) {
            routeLayerGroup.removeLayer(layer);
        }); 

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

        setTimeout(function () {
            let requestHeaderFirstAttribute = 'Accept';
            let requestHeaderSecondAttribute = 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8';
            let request = new XMLHttpRequest();
            request.open('GET', `https://api.openrouteservice.org/v2/directions/cycling-regular?api_key=5b3ce3597851110001cf6248d682833474fb4806ad8717782a657f2c&start=${startCoordinates[1]},%20${startCoordinates[0]}&end=${endCoordinates[1]},%20${endCoordinates[0]}`);
            request.setRequestHeader(requestHeaderFirstAttribute, requestHeaderSecondAttribute);
            request.onload = function () {

                if (this.status == 200) {

                    let routeObj = JSON.parse(this.responseText);
                    let i;
                    for (i in routeObj.features[0].geometry.coordinates) {
                        let temp = routeObj.features[0].geometry.coordinates[i][0];
                        routeObj.features[0].geometry.coordinates[i][0] = routeObj.features[0].geometry.coordinates[i][1];
                        routeObj.features[0].geometry.coordinates[i][1] = temp;
                    }

                    let polyline = L.polyline(routeObj.features[0].geometry.coordinates, {color: 'green'});
                    let markerA = L.marker(routeObj.features[0].geometry.coordinates[0], {icon: iconAlphaA});
                    let animatedMarkerCreationStyles = ["animate__animated", "animate__zoomIn", "animate__fast"]
                    markerA.on('add', function () {
                        markerA._icon.classList.add(...animatedMarkerCreationStyles);
                    });
                    


                    let markerB = L.marker(routeObj.features[0].geometry.coordinates[routeObj.features[0].geometry.coordinates.length - 1], {icon: iconAlphaB});
                    markerB.on('add', function () {
                        markerB._icon.classList.add(...animatedMarkerCreationStyles);
                    });
                    polyline.addTo(routeLayerGroup);
                    markerA.addTo(routeLayerGroup);
                    markerB.addTo(routeLayerGroup);

                    routeLayerGroup.addTo(map);
                    markerBpoint.eachLayer(function (layer) {
                        markerBpoint.removeLayer(layer);
                    }); 

                    map.fitBounds(routeLayerGroup.getBounds());

                } else {
                    alert('Сервер не отвечает , попробуйте еще раз. Статус ошибки ' + this.status);
                    return 0;
                }
            };
            request.send();
        }, 1100);
    }
}());