<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/connection.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/sql.php';
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="favicon.ico">
    <link rel="stylesheet" href="css/style.css">
    <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
            integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
            crossorigin=""></script>
    <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDxvXuznL3aWv-ISWr9I5nPIcI5Pv0jWgU&libraries=&v=weekly"
    ></script>


    <link rel="apple-touch-icon" sizes="57x57" href="img/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="img/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="img/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="img/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="img/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="img/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="img/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="img/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="img/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="img/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png">
    <link rel="manifest" href="img/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="img/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    
    <!-- Засуньте это куда-нибудь -->
    <style>
        .bar::-webkit-scrollbar {
            display: none;
        }
        
        .bar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>

    <title>Taganroad</title>
</head>
<body>


<aside class="bar">
    <header>
        <a class="logo" href="index.php"><h1>Taganroad</h1></a>
    </header>

    <nav>
        <ul>
            <a href="#tab-transport" class="tab">
                <li>Маршруты</li>
            </a>
            <a href="#tab-about-transport" class="tab">
                <li>Информация</li>
            </a>
            <a href="#tab-popular-place" class="tab">
                <li>Места</li>
            </a>
        </ul>
    </nav>

    <section class="section-item" open-by-tab="tab-transport">
        <div class="section-title">
            <h2>Маршрут</h2>
        </div>

        <div class="content">
            <form class="route">
                <div class="form-group">
                    <label>
                        <input type="text" name="from" class="inputAdress" id="from" placeholder=" " autocomplete="off">
                        <span class="help-message">Введите адрес отправления (A)</span>
                    </label>

                    <button type="button" point="departure" id="buttonA">auto</button>
                </div>

                <div class="form-group">
                    <label>
                        <input type="text" name="to" class="inputAdress" id="to" placeholder=" " autocomplete="off">
                        <span class="help-message">Введите адрес прибытия (B)</span>
                    </label>

                    <button type="button" point="arrival" id="buttonB" saved="false">auto</button>
                </div>
            </form>

            <button id="buttonCreateRoute" type="button">Построить маршрут</button>
        </div>
    </section>

    <section id="transport" class="section-item" open-by-tab="tab-transport">
        <div class="section-title">
            <h2>Транспорт</h2>

            <label>
                <select>
                    <?php print_transport_types($link); ?>
                </select>
            </label>
        </div>

        <div class="content">
            <?php print_routes_and_transport($link, 0); ?>
        </div>
    </section>

    <section id="about-transport" class="section-item" open-by-tab="tab-about-transport">
        <div class="section-title">
            <h2>О транспорте</h2>

            <!-- Выполнить стилизацию -->
            <select>
                <?php print_transport_types($link); ?>
            </select>
        </div>

        <div class="content">
            <?php print_full_information($link); ?>
        </div>
    </section>

    <section id="popular-place" class="section-item" open-by-tab="tab-popular-place">
        <div class="section-title">
            <h2>Популярные места</h2>

            <!-- Выполнить стилизацию -->
            <label>
                <select>
                    <?php print_regions($link); ?>
                </select>
            </label>
        </div>

        <div class="content">
            <?php print_places($link, 0); ?>
        </div>
    </section>
</aside>

<div id="mapid" style="width: 100%; height: 100%;"></div>

<script>
    const mapOptions = {
        center: [47.221965, 38.910854],
        zoom: 13
    };

    var map = L.map('mapid').setView(mapOptions.center, mapOptions.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
        foo: 'bar',
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(map);
</script>

<script src="./scripts/mapFunctions.js"></script>
<script src="./scripts/interfaceFunctions.js"></script>
</body>
</html>