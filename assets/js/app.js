//Weather Dashaboard 1.0.0

//event listener
document.addEventListener('DOMContentLoaded', function () {
document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
    });
    displaySearchHistory();
});


//api call for current weather data from user search
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
            displayCurrentWeather(data);
            localStorage.setItem(`weatherData_${city}`, JSON.stringify(data));
            displaySearchHistory();

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });

}


//api call for forecasted data using current weather lat/lon
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
            displayForecast(data); 
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}


//Display functions
function displayCurrentWeather(data) {
    //create container inside #currentWeather
    const weatherContainer = document.getElementById('currentWeather');
    //clear previous content
    weatherContainer.innerHTML = '';

    //create child elements from data object
    const cityHeader = document.createElement('h3');
    cityHeader.textContent = `Current Weather in ${data.name}`;
    cityHeader.classList.add('current-header');

    const temperature = document.createElement('p');
    temperature.textContent = `Temperature: ${data.main.temp} °F`;
    temperature.classList.add('current-temp');

    const windSpeed = document.createElement('p');
    windSpeed.textContent = `Wind: ${data.wind.speed} mph`;
    windSpeed.classList.add('current-windspeed'); //add directional later

    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity} %`;
    humidity.classList.add('current-humidity');

    //added weather icon from weather array
    const weatherIcon = document.createElement('img');
    if(data.weather && data.weather.length > 0) {
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
        weatherIcon.alt = data.weather[0].description;
        weatherIcon.classList.add('current-weather-icon');
    }

    //append children elements to parent container
    weatherContainer.appendChild(cityHeader);
    weatherContainer.appendChild(weatherIcon); 
    weatherContainer.appendChild(temperature);
    weatherContainer.appendChild(windSpeed);
    weatherContainer.appendChild(humidity);
    //
    weatherContainer.style.display = 'block';
}


function displayForecast(data) {
    //create container inside #forecastContainer
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = ''; 

    //for loop to iterate through forecast array(every 3 hours, incriment by 8 for 24 hour gaps)
    for (let i = 0; i < data.list.length; i += 8) { 
        const forecastItem = data.list[i];

        //create a div for each forecast card
        const forecastDayDiv = document.createElement('div');
        forecastDayDiv.classList.add('forecast-day');

        //create child elements from data object
        const dateElement = document.createElement('p');
        dateElement.textContent = `${new Date(forecastItem.dt_txt).toLocaleDateString()}`;
        dateElement.classList.add('forecast-date');

        const tempElement = document.createElement('p');
        tempElement.textContent = `Temp: ${forecastItem.main.temp} °F`;
        tempElement.classList.add('forecast-temp');

        const windSpeed = document.createElement('p');
        windSpeed.textContent = `Wind: ${forecastItem.wind.speed} mph`;
        windSpeed.classList.add('forecast-windspeed'); //add directional later
    
        const humidity = document.createElement('p');
        humidity.textContent = `Humidity: ${forecastItem.main.humidity}%`;
        humidity.classList.add('forecast-humidity');

        //added weather icon from weather array
        const weatherIcon = document.createElement('img');
        if(forecastItem.weather && forecastItem.weather.length > 0) {
        const iconCode = forecastItem.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
        weatherIcon.alt = forecastItem.weather[0].description;
        weatherIcon.classList.add('forecast-weather-icon');
        forecastDayDiv.appendChild(weatherIcon);
    }

        //append children elements to parent container
        forecastDayDiv.appendChild(dateElement);
        forecastDayDiv.appendChild(tempElement);
        forecastDayDiv.appendChild(weatherIcon); 
        forecastDayDiv.appendChild(windSpeed);
        forecastDayDiv.appendChild(humidity);
        forecastContainer.appendChild(forecastDayDiv);

    }
}

function displaySearchHistory() {
    const searchHistoryContainer = document.getElementById('searchHistory');
    searchHistoryContainer.innerHTML = ''; 

    // Loop through local storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        //check if key is in local storage
        if (key.startsWith('weatherData_')) {
            const city = key.split('_')[1];

            const recentCityContainer = document.createElement('div');
            recentCityContainer.classList.add('recent-city')

            //create button element for each city
            const recentCity = document.createElement('button');
            recentCity.textContent = city;
            recentCity.classList.add('recent-button');
            
            //click listener to call main function 
            recentCity.addEventListener('click', () => {
                getWeatherData(city);
            });

            
            recentCityContainer.appendChild(recentCity);
            searchHistoryContainer.appendChild(recentCityContainer);
        }
    }
}
