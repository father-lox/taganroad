let buttonsOfFields = document.querySelectorAll(".form-group button");

function toInsertAndClearAddress(itemTarget) {
    let fieldInput = itemTarget.parentElement.firstElementChild.firstElementChild;
    let arrayAddresses = ["ул. Некрасовская 44", "ул. Петровская 2", "ул. Победы 9"]; //Это массив временных данных - удалить в релизе

    if (fieldInput.value == "" && itemTarget.getAttribute("point") === "arrival")
    {
        //ЗДАЧА: Реализовать считывание геолокации пользователя
        fieldInput.value = arrayAddresses[Math.floor(Math.random() * arrayAddresses.length)];
        itemTarget.textContent = "";
        itemTarget.classList.add("clear-field");
    }
    else if (fieldInput.value == "" && itemTarget.getAttribute("point") === "departure") {

        //ЗАДАЧА: Реализовать считывание место прибытия путём клика в нужное место на карте
        fieldInput.value = arrayAddresses[Math.floor(Math.random() * arrayAddresses.length)];
        itemTarget.textContent = "";
        itemTarget.classList.add("clear-field");
    }
    else
    {
        fieldInput.value = "";
        itemTarget.classList.remove("clear-field");
        itemTarget.textContent = "auto";
    }    
}

//Устанавливаем события "клик" на все кнопки поллей ввода адрессов
for (let i = 0; i < buttonsOfFields.length; i++)
    buttonsOfFields[i].addEventListener("click", function(evt) {
        toInsertAndClearAddress(evt.target);
    });


// Раскрытие и сворачивание списка, а также изменение цвета border
let arrow = document.querySelectorAll(".header-list img");
let spoilers = document.querySelectorAll(".spoiler");

function toSelectAll(itemTarget) {
    let checkboxes = itemTarget.parentElement.nextElementSibling.children;
    if (itemTarget.lastElementChild.checked == true) {
        itemTarget.style.borderRightColor = "#55c88e";
        for (let i = 0; i < checkboxes.length; i++)
            checkboxes[i].firstElementChild.checked = true;        
    }
    else {
        for (let i = 0; i < checkboxes.length; i++)
            checkboxes[i].firstElementChild.checked = false;
        itemTarget.style.borderRightColor = "#757575";
    }
}

for (let i = 0; i < spoilers.length; i++)
    spoilers[i].addEventListener("click", function() { 
        // Почему функция выполняется два раза?
        toSelectAll(spoilers[i]);
    });

for (let i = 0; i < arrow.length; i++)
    arrow[i].addEventListener("click", function() {
        if (arrow[i].classList.contains("arrow-close") && arrow[i].parentElement.nextElementSibling.classList.contains("body-list-close")) {
            arrow[i].classList.remove("arrow-close");
            arrow[i].parentElement.nextElementSibling.classList.remove("body-list-close");
        }
        else {
            arrow[i].classList.add("arrow-close");
            arrow[i].parentElement.nextElementSibling.classList.add("body-list-close");
        }
        // console.log(arrow);
        
    });

