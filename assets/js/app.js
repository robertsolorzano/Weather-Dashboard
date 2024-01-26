//ideally I want to add my api key to a .env and install dotenv if this was an express app for protection and to not break any policy agreements
const apiKey = '8f71d08fa9cb2980da4905c964414ed3';

document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').ariaValueMax.trim();
    if (city) {
        getWeatherData(city);//need to make this function later
    } else {
        alert('PLease enter a city name');
    }
})