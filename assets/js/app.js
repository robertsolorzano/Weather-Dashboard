//Weather Dashaboard
document.addEventListener('DOMContentLoaded', function () {
document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value.trim();
    if (city) {
        getWeatherData(city);
        getForecastData(city);
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
            displayCurrentWeather(data); //need to make this later
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });

}

function getForecastData(city) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

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
