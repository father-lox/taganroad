<?php
define("ERROR", "Error: ");

function print_transport_types(PDO $link)
{
    $sql = "SELECT `type` FROM `transport_types`";

    try {
        $result = $link->query($sql);
        echo "<option value='all' selected>Все</option>\n";
        if ($result) {
            foreach ($result as $type) {
                echo "\t\t\t\t<option value='" . $type['type'] . "'>" . $type['type'] . "</option>\n";
            }
        }
    } catch (PDOException $e) {
        echo ERROR . $e->getMessage();
    }
}

function print_routes_and_transport(PDO $link, int $q)
{
    if ($q) {
        $sql = "SELECT * FROM `routes` WHERE `id_type` = $q AND `is_active` = 1";
    } else {
        $sql = "SELECT * FROM `routes` WHERE `is_active` = 1";
    }

    try {
        $result = $link->query($sql);
        if ($result) {
            foreach ($result as $route) { ?>
            
                <?php echo "<div class=\"transport-item\" data-select-type='" . get_transport_type($link, $route['id_type']) . "'>\n"; ?>
                    <div class="header-list">
                        <img class="img-list" src="img/alpha-list.svg" alt="Развернуть список">

                        <label class="spoiler">
                            <?php echo "<h3>№" . $route['route_number'] . " " . get_transport_type($link, $route['id_type']) . "</h3>\n"; ?>

                            <div class="base-info">
                                <?php
                                if ($route['is_active']) {
                                    echo "<span>Статус: активен</span>\n";
                                } else {
                                    echo "<span>Статус: неактивен</span>\n";
                                }
                                echo "\t\t\t\t\t\t\t\t<span>Время движения: " . $route['schedule'] . "</span>\n";
                                ?>
                            </div>

                            <div class="time-interval">
                                <span>14:20</span>
                                <span>14:30</span>
                                <span>14:40</span>
                            </div>

                            <input type="checkbox" name="route-number">
                        </label>
                    </div>

                    <div class="body-list">
                        <?php print_transport($link, $route['id_route'], $route['id_type']); ?>
                    </div>
                </div>

            <?php }
        }
    } catch (PDOException $e) {
        echo ERROR . $e->getMessage();
    }
}

function print_transport(PDO $link, int $id_route, int $id_type)
{
    $sql = "SELECT * FROM `transport` WHERE `id_type` = $id_type AND `id_route`= $id_route AND `is_active` = 1";

    try {
        $result = $link->query($sql);
        if ($result) {
            foreach ($result as $transport) { ?>

                <label active1="no" active2="no" class="body-list-item">
                    <input type="checkbox" name="s" id="">
                    <span class="icon-check"></span>

                    <div class="about-transport">
                        <?php echo "<h4>Номер машины " . $transport['number'] . "</h4>\n"; ?>

                        <div class="base-info">
                            <span>Местоположение: улица Энгельса</span>
                        </div>

                        <div class="time-interval">
                            <span>15:20</span>
                            <span>16:30</span>
                            <span>17:40</span>
                        </div>
                    </div>
                </label>

            <?php }
        }
    } catch (PDOException $e) {
        echo ERROR . $e->getMessage();
    }
}

function get_transport_type(PDO $link, int $id_type)
{
    $sql = "SELECT `type` FROM `transport_types` WHERE `id_type` = $id_type";

    try {
        $result = $link->query($sql);
        if ($result) {
            return $result->fetch()['type'];
        }
        return "No data";
    } catch (PDOException $e) {
        return ERROR . $e->getMessage();
    }
}

function print_full_information(PDO $link)
{
    $sql = "SELECT * FROM `routes` WHERE `is_active` = 1";

    try {
        $result = $link->query($sql);
        if ($result) {
            foreach ($result as $route) { ?>

                <?php echo "<div class=\"transport-item\" data-select-type='" . get_transport_type($link, $route['id_type']) . "'>\n"; ?>
                    <div class="header-list">
                        <img class="img-list" src="img/alpha-list.svg" alt="Развернуть список">

                        <div class="spoiler">
                            <?php echo "<h3>№" . $route['route_number'] . " " . get_transport_type($link, $route['id_type']) . "</h3>\n"; ?>

                            <div class="base-info">
                                <?php echo "<span>Время движения: " . $route['schedule'] . "</span>\n"; ?>
                                <?php echo "<span>Период движения: " . $route['period'] . "</span>\n"; ?>
                                <?php echo "<span>Стоимость проезда: до " . $route['fare'] . " рублей</span>\n"; ?>

                                <?php
                                if ($route['has_benefits']) {
                                    echo "<span>Льготы: есть</span>\n";
                                } else {
                                    echo "<span>Льготы: нет</span>\n";
                                }
                                ?>

                                <?php
                                if ($route['is_active']) {
                                    echo "<span>Статус: активен</span>\n";
                                } else {
                                    echo "<span>Статус: неактивен</span>\n";
                                }
                                ?>
                            </div>
                        </div>
                    </div>

                    <div class="body-list">
                        <?php print_transport_info($link, $route['id_route'], $route['id_type']); ?>
                    </div>
                </div>

            <?php }
        }
    } catch (PDOException $e) {
        echo ERROR . $e->getMessage();
    }
}

function print_transport_info(PDO $link, int $id_route, int $id_type)
{
    $sql = "SELECT * FROM `transport` WHERE `id_type` = $id_type AND `id_route`= $id_route";

    try {
        $result = $link->query($sql);
        if ($result) {
            foreach ($result as $transport) { ?>

                <label class="body-list-item">
                    <span class="icon-check"></span>

                    <div class="about-transport">
                        <?php echo "<h4>Номер машины " . $transport['number'] . "</h4>\n"; ?>

                        <div class="base-info">
                            <?php echo "<span>Местоположение: улица Энгельса</span>\n"; ?>

                            <?php
                            if ($transport['is_active']) {
                                echo "<span>Статус: активен</span>\n";
                            } else {
                                echo "<span>Статус: неактивен</span>\n";
                            }
                            ?>

                            <?php echo "<span>Период движения: " . $transport['period'] . " часа</span>\n"; ?>
                            <?php echo "<span>Эксплуатируется с " . $transport['start_of_use'] . " года</span>\n"; ?>
                            <?php echo "<span>Количество мест: " . $transport['seats'] . "</span>\n"; ?>
                        </div>
                    </div>
                </label>

            <?php }
        }
    } catch (PDOException $e) {
        echo ERROR . $e->getMessage();
    }
}

function print_regions(PDO $link)
{
    $sql = "SELECT `region` FROM `regions`";

    try {
        $result = $link->query($sql);
        echo "<option data-select-region='all' selected>Все районы</option>\n";
        if ($result) {
            foreach ($result as $region) {
                echo "\t\t\t\t\t<option data-select-region='" . $region['region'] . "'>" . $region['region'] . "</option>\n";
            }
        }
    } catch (PDOException $e) {
        echo ERROR . $e->getMessage();
    }
}

function print_places(PDO $link, int $q)
{
    if ($q) {
        $sql = "SELECT * FROM `places` WHERE `id_region` = 1";
    } else {
        $sql = "SELECT * FROM `places`";
    }

    try {
        $result = $link->query($sql);
        if ($result) {
            foreach ($result as $place) { ?>

                <?php echo "<div class=\"place-item\" data-select-type='" . get_region($link, $place['id_region']) . "'>\n"; ?>
                    <div class="place-photo">
                        <?php echo "<img src=\"" . $place['image'] . "\" alt=\"" . $place['name'] . "\">\n"; ?>
                    </div>

                    <div class="place-description">
                        <?php echo "<h3>" . $place['name'] . "</h3>\n"; ?>
                        <?php echo "<p>" . $place['description'] . "</p>\n"; ?>
                    </div>

                    <div class="form-group">
                        <label>
                            <input type="text" placeholder=" " class="inputAdress" id="inputPlaces" autocomplete="off">
                            <span class="help-message">Введите адрес отправления (A)</span>
                        </label>

                        <button type="button" point="departureplaces" id="buttonPlaces">auto</button>
                    </div>
                </div>

            <?php }
        }
    } catch (PDOException $e) {
        echo ERROR . $e->getMessage();
    }
}

function get_region(PDO $link, int $id_region)
{
    $sql = "SELECT `region` FROM `regions` WHERE id_region = $id_region";
    
    try {
        $result = $link->query($sql);
        if ($result) {
            return $result->fetch()['region'];
        }
        return "No data";
    } catch (PDOException $e) {
        echo ERROR . $e->getMessage();
    }
}
