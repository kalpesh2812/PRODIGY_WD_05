const apiKey = '690e72aaf3f56d2d8b09f60198149809';
const weatherInfoDiv = document.getElementById('weatherInfo');

function getWeatherByCity() {
    const city = document.getElementById('locationInput').value.trim();
    if (city) {
        fetchWeatherByCity(city);
    } else {
        alert('Please enter a city name.');
    }
}

function fetchWeatherByCity(city) {
    weatherInfoDiv.innerHTML = '<p>Loading...</p>';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfoDiv.innerHTML = '<p>City not found. Please try again.</p>';
        });
}

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Location not found');
                    }
                    return response.json();
                })
                .then(data => displayWeather(data))
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    weatherInfoDiv.innerHTML = '<p>Error fetching weather data based on location.</p>';
                });
        }, () => {
            alert('Unable to access your location. Please enable location services.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function displayWeather(data) {
    const { name, weather, main } = data;
    const description = weather[0].description;
    const temperature = main.temp;
    weatherInfoDiv.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Condition: ${description}</p>
        <p>Temperature: ${temperature} °C</p>
    `;
}
