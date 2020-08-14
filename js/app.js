const form = document.getElementById('form');
const inputCity = document.getElementById('city-input');
let resultRow = document.getElementById('result-row');



form.addEventListener('submit', (event) => {
    // throw alert message if input is empty
    if (inputCity.value === '') {
        alertMsg();
    }

    const allColumns = document.querySelectorAll('.result-content');
    console.log(allColumns);
    allColumns.forEach(element => console.log(element))

    // API implementation
    const apiKey = '0f64feae080d47fe23304df7325e3bf6';
    const cityName = inputCity.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // data destructuring
            const { name, weather, main, sys: { country } } = data;
            // create div tag
            const div = document.createElement('div');
            div.classList.add('col-lg-4', 'col-md-6');
            const htmlMarkup = `<div class="result-content text-center shadow">
              <h2 class="text-success mb-3 ">${name}<sup class="country-name">${country}</sup></h2>
              <h1 class="text-white mb-3 font-weight-bold">${Math.floor(main.temp)} <sup class="deg-cal">°C</sup></h1>
              <figure>
                <img class="city-icon" src="https://openweathermap.org/img/wn/${
                weather[0]["icon"]
                }@2x.png">
                <figcaption class="text-white">${weather[0].main}</figcaption>
              </figure>
            </div>`;

            div.innerHTML = htmlMarkup;
            resultRow.appendChild(div);

        })
        .catch(() => alertMsg())

    inputCity.value = '';
    event.preventDefault();
});

/// function alert message
function alertMsg() {
    const alertMsg = document.getElementById('alert-msg');
    alertMsg.style.display = 'block';
    setTimeout(function () {
        alertMsg.style.display = 'none';
    }, 2000);
}