const form = document.getElementById('form');
const inputCity = document.getElementById('city-input');
const resultRow = document.getElementById('result-row');



form.addEventListener('submit', (event) => {
    // throw alert message if input is empty
    if (inputCity.value === '') {
        alertMsg('Please search for a valid city');
    }
    else {
        // API implementation
        const apiKey = '0f64feae080d47fe23304df7325e3bf6';
        const cityName = inputCity.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let foundCity = false;
                const weatherList = JSON.parse(localStorage.getItem('weatherList'));
                if (weatherList) {
                    weatherList.forEach(weather => {
                        if (weather.name === data.name) {
                            foundCity = true;
                            alertMsg('City Weather Result is already in List')
                        } else {
                            foundCity = false;
                        }
                    });
                }

                if (foundCity === false) {
                    singleCityWeather(data);
                    storeData(data);
                }

            })
            .catch(() => alertMsg('Please search for a valid city'))

        inputCity.value = '';
        inputCity.focus();
    }
    event.preventDefault();
});

/// function alert message
function alertMsg(string) {
    const alertMsg = document.getElementById('alert-msg');
    alertMsg.textContent = string;
    alertMsg.style.display = 'block';
    setTimeout(function () {
        alertMsg.style.display = 'none';
    }, 2000);
}

// store previous weather result in localStorage
function storeData(data) {
    let weatherList;
    if (localStorage.getItem('weatherList') === null) {
        weatherList = [];
    }
    if (localStorage.getItem('weatherList')) {
        weatherList = JSON.parse(localStorage.getItem('weatherList'));
    }
    weatherList.push(data);
    localStorage.setItem('weatherList', JSON.stringify(weatherList));
}

window.addEventListener('DOMContentLoaded', (e) => {
    const weatherList = JSON.parse(localStorage.getItem('weatherList'));
    if (weatherList !== null) {
        weatherList.forEach(data => singleCityWeather(data));
    }
});

function singleCityWeather(data) {
    // data destructuring
    const { name, weather, main, sys: { country } } = data;
    // create div tag
    const div = document.createElement('div');
    div.classList.add('col-lg-4', 'col-md-6');
    const htmlMarkup = `<div class="result-content text-center shadow">
      <h2 class="city text-success mb-3">${name}<sup class="country-name">${country}</sup></h2>
      <h1 class="text-white mb-3 font-weight-bold">${Math.floor(main.temp)} <sup class="deg-cal">°C</sup></h1>
      <figure>
        <img class="city-icon" src="https://openweathermap.org/img/wn/${weather[0]["icon"]
        }@2x.png">
        <figcaption class="text-white">${weather[0].main}</figcaption>
      </figure>
    </div>`;

    div.innerHTML = htmlMarkup;
    resultRow.appendChild(div);
}