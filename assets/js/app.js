//Weather Dashaboard
document.addEventListener('DOMContentLoaded', function () {
document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
    });

});

const apiKey = '8f71d08fa9cb2980da4905c964414ed3';

function getWeatherData(city) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`

    fetch(currentWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Current Weather Data:', data)
            console.log('Latitude: ', data.coord.lat);
            console.log('Longitude: ', data.coord.lon);
            getForecastData(data.coord.lat, data.coord.lon);
            displayCurrentWeather(data); //need to make this later

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });

}


function getForecastData(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Forecast Data;' , data)
            displayForecast(data); //need to make this later
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}

function displayCurrentWeather(data) {
    //create container inside #currentWeather
    const weatherContainer = document.getElementById('currentWeather');
    //clear previous content
    weatherContainer.innerHTML = '';

    //create child elements from data object
    const cityHeader = document.createElement('h3');
    cityHeader.textContent = `Current Weather in ${data.name}`;

    const temperature = document.createElement('p');
    temperature.textContent = `Temperature: ${data.main.temp} °F`;

    //append children elements to parent container
    weatherContainer.appendChild(cityHeader);
    weatherContainer.appendChild(temperature);
}

function displayForecast(data) {
    //create container inside #forecastContainer
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = ''; 

    //for loop to iterate through forecast array(every 3 hours, incriment by 8 for 24 hour gaps)
    for (let i = 0; i < data.list.length; i += 8) { 
        const forecastItem = data.list[i];

        //create child elements from data object
        const dateElement = document.createElement('p');
        dateElement.textContent = `Date: ${new Date(forecastItem.dt_txt).toLocaleDateString()}`;

        const tempElement = document.createElement('p');
        tempElement.textContent = `Temp: ${forecastItem.main.temp} °F`;

        //append children elements to parent container
        forecastContainer.appendChild(dateElement);
        forecastContainer.appendChild(tempElement);

    }
}
