let checkSave = true;

document.querySelectorAll(".tab").forEach(function(item) {
    item.addEventListener("click", function(e) {
        e.preventDefault();

        const showItem = "section[open-by-tab='" + e.currentTarget.getAttribute("href").replace("#", "") + "']";        

        document.querySelectorAll(".tab").forEach((
            (child) => child.classList.remove("active-tab")
        ));

        document.querySelectorAll(".section-item").forEach((
            (child) => child.classList.remove("active-tab-item")
        ));

        item.classList.add("active-tab")
        document.querySelectorAll(showItem).forEach((el) => el.classList.add("active-tab-item"));
    });
});

document.querySelector(".tab li").click(); //Выполняем программный клик по первому элементу


// КНОПКА AUTO 
document.querySelectorAll(".form-group button").forEach(function(item) {
    item.addEventListener("click", function (e) {
        let fieldInput = e.currentTarget.parentElement.firstElementChild.firstElementChild;
        if (fieldInput.value == "" && e.currentTarget.getAttribute("point") === "arrival") 
        {
            alert('Выберите место на карте');
        }    
        else if (fieldInput.value == "" && e.currentTarget.getAttribute("point") === "departure")
        {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition,showAlert);
                
              }
              function showPosition(position) {
                document.getElementById('buttonA').textContent = "";
                document.getElementById('buttonA').classList.add("clear-field");
            
                let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyDxvXuznL3aWv-ISWr9I5nPIcI5Pv0jWgU`;
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                fieldInput.value = data.results[0].address_components[1].long_name + ', ' + data.results[0].address_components[0].short_name;

                } )
                .catch(err=> console.warn(err.message));
         
              }
              function showAlert() {
                  alert('Не удалось получить местоположение');
              }
           
        }    
        else if (fieldInput.value == "" && e.currentTarget.getAttribute("point") === "departureplaces") {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition,showAlert);
                
              }
              function showPosition(position) {
                document.getElementById('buttonPlaces').textContent = "";
                document.getElementById('buttonPlaces').classList.add("clear-field");
            
                let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyDxvXuznL3aWv-ISWr9I5nPIcI5Pv0jWgU`;
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                fieldInput.value = data.results[0].address_components[1].long_name + ', ' + data.results[0].address_components[0].short_name;

                } )
                .catch(err=> console.warn(err.message));
         
              }
              function showAlert() {
                  alert('Не удалось получить местоположение');
              }
        }

        else if (    document.getElementById('buttonB').textContent == "save") {
            checkSave = false;
            document.getElementById('buttonB').textContent = "";
            document.getElementById('buttonB').classList.add("clear-field");
        }

        else
        {

            if (fieldInput.id == "to") {
                checkSave = true;
            }
            fieldInput.value = "";
            e.currentTarget.classList.remove("clear-field");
            e.currentTarget.textContent = "auto";
        }     
    });    
});    

// СПИСОК: Разворачивание списка в разделе "Транспорт"
document.querySelectorAll("#transport .img-list").forEach(function(item) {
    item.addEventListener("click", function(e)
    {     
        let arrow = e.currentTarget;
        let content = e.currentTarget.parentElement.nextElementSibling;
        
        if (arrow.classList.contains("arrow-open") && content.classList.contains("body-list-open"))
        {
            arrow.classList.remove("arrow-open");
            content.classList.remove("body-list-open");
        }
        else
        {
            arrow.classList.add("arrow-open");
            content.classList.add("body-list-open");
        }
    });
});


// СПИСОК: Разворачивание списка в разделе "О транспорте"
document.querySelectorAll("#about-transport .header-list").forEach(function(item)
{
    item.addEventListener("click", function(e) 
    {    
        let arrow = e.currentTarget.firstElementChild;
        let content = e.currentTarget.nextElementSibling;
        let spoiler = e.currentTarget.querySelector(".spoiler");
        
        if (arrow.classList.contains("arrow-open") && content.classList.contains("body-list-open") && spoiler.classList.contains("spoiler-check-show"))
        {
            arrow.classList.remove("arrow-open");
            content.classList.remove("body-list-open");
            spoiler.classList.remove("spoiler-check-show");
        }
        else
        {
            arrow.classList.add("arrow-open");
            content.classList.add("body-list-open");
            spoiler.classList.add("spoiler-check-show");
        }
    });
});

function toSelectAll(itemTarget) {
    let checkboxes = itemTarget.parentElement.nextElementSibling.children;
    if (itemTarget.lastElementChild.checked == true) {
        itemTarget.classList.add("spoiler-check-show");
        for (let i = 0; i < checkboxes.length; i++)
            checkboxes[i].firstElementChild.checked = true;        
    }
    else {
        for (let i = 0; i < checkboxes.length; i++)
            checkboxes[i].firstElementChild.checked = false;
        itemTarget.classList.remove("spoiler-check-show");
    }
}

document.querySelectorAll("#transport .spoiler").forEach((item) => {
    item.addEventListener("click", function() { 
        //ЗАДАЧА: Исправить двоеное выполнение функции
        //ЗАДАЧА: Убирать выделение спойлера, когда в теле списка выбраны не все элементы
        //ЗАДАЧА: Добавлять выделение спойлера, когда в теле списка выбраны все элементы
        toSelectAll(item);
    });
});

function inputKeyPress(inputId) {
    if (inputId === 'to'){
        if (document.getElementById('to').value.length > 0)  {
            document.getElementById('buttonB').innerHTML = "";
            document.getElementById('buttonB').classList.remove("active-tab");
            document.getElementById('buttonB').classList.remove("active-tab-item");
            document.getElementById('buttonB').classList.add("clear-field");
        }
        else {
            document.getElementById('buttonB').innerHTML = "auto";
            document.getElementById('buttonB').classList.add("active-tab");
            document.getElementById('buttonB').classList.add("active-tab-item");
            document.getElementById('buttonB').classList.remove("clear-field");
        }

    }
    else if (inputId === 'from') {
        if (document.getElementById('from').value.length > 0)  {
            document.getElementById('buttonA').innerHTML = "";
            document.getElementById('buttonA').classList.remove("active-tab");
            document.getElementById('buttonA').classList.remove("active-tab-item");
            document.getElementById('buttonA').classList.add("clear-field");
        }
        else {
            document.getElementById('buttonA').innerHTML = "auto";
            document.getElementById('buttonA').classList.add("active-tab");
            document.getElementById('buttonA').classList.add("active-tab-item");
            document.getElementById('buttonA').classList.remove("clear-field");
        }
    }
    else if (inputId === 'inputPlaces') {
        if (document.getElementById('inputPlaces').value.length > 0)  {
            document.getElementById('buttonPlaces').innerHTML = "";
            document.getElementById('buttonPlaces').classList.remove("active-tab");
            document.getElementById('buttonPlaces').classList.remove("active-tab-item");
            document.getElementById('buttonPlaces').classList.add("clear-field");
        }
        else {
            document.getElementById('buttonPlaces').innerHTML = "auto";
            document.getElementById('buttonPlaces').classList.add("active-tab");
            document.getElementById('buttonPlaces').classList.add("active-tab-item");
            document.getElementById('buttonPlaces').classList.remove("clear-field");
        }
    }
    
}