const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const apikey = WEATHER_API_KEY;
const countries = document.querySelectorAll("path");
const sidePanel = document.querySelector("#side-panel");
const htmlCountry = document.querySelector("#country");
const htmlDegree = document.querySelector("#degree");
const htmlHumidity = document.querySelector("#humidity");
const htmlWeather = document.querySelector("#weather");
const htmlEmoji = document.querySelector("#emoji");
const htmlLastUpdate = document.querySelector("#lastUpdate");
const htmlErrorMessage = document.querySelector("#error-message");
const htmlButtonSearch = document.querySelector("#searchBar");


countries.forEach(country =>{
  country.addEventListener("click", function(){

    // S'il n'y a pas de classe, on récupère le name
    countryClass = country.getAttribute('class');
    if (countryClass === null) {
      countryClass = country.getAttribute(  'name');
    }
    showWeather(countryClass);
    ShowSidePanel();
  })
})

// Récupere le texte puis affiche la météo entrée
addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        showWeather(htmlButtonSearch.value);
    }
});

function HideSidePanel(){

  sidePanel.style.transform = "translateX(-1000px)"
  
}

function ShowSidePanel(){
  
  sidePanel.style.transform = "translateX(0)"

}


async function getWeather(city) {
  const url = `${BASE_URL}?q=${city}&appid=${apikey}`;

  const response = await fetch(url);

  if (!response.ok) {
    showError("Couldn't get the weather");
  } else {
    sidePanel.classList.remove("error-mode");
    htmlErrorMessage.textContent =  "";
    return await response.json();
  }
}

async function showWeather(city) {
  
  
    let weatherData = await getWeather(city);
    // Recupération de meteo
    const weatherDataKelvin = weatherData["main"]["temp"];

    // Kelvin à celcius
    let weatherDataC = weatherDataKelvin - 273.15;
    weatherDataC = weatherDataC.toFixed(1);

    //Récupération humidité
    const humidityData = weatherData["main"]["humidity"];

    //Récuperation weather
    const descData = weatherData["weather"]["0"]["description"];

    //Récuperation emoji
    const weatherIDData = weatherData["weather"]["0"]["id"];
    let emoji = getWeatherEmoji(weatherIDData);

    // Récuperation du temps
    const timeStamp = weatherData["dt"];
    // Convert Unix timestamp (seconds) to a human-readable date and time string
    // Using England locale, short date and medium time format. ex: 10/12/2025, 15:07:44
    var date = new Date(timeStamp * 1000).toLocaleString("en-GB", {
        dateStyle: "short",
        timeStyle: "medium"
    });

    updateWeatherPanel({city, weatherDataC, humidityData, descData, emoji, date});
}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}

function showError(message) {
    const errorP = document.getElementById("error-message");
    errorP.textContent = message;

    document.getElementById("side-panel").classList.add("error-mode");
}


///////////////////////////////////////// Weather for user location /////////////////////////////////////////
async function getWeatherByUserLocation(latitude, longitude) {
    const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${apikey}`;

    const response = await fetch(url);

    if (!response.ok) {
        showError("Couldn't get the weather");
    } else {
        sidePanel.classList.remove("error-mode");
        htmlErrorMessage.textContent =  "";
        return await response.json();
    }
}

function getLocationOfTheUser(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(
            locationOK,
            locationError,
        );

    }
    else{
        console.log("Your navigator geolocation is not supported");
    }

}

function locationOK(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(latitude, longitude);


    showWeatherByUserLocation(latitude, longitude);
    ShowSidePanel();

}

function locationError(error) {
    let message = "";
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            message = "The request to get user location timed out.";
            break;
        default:
            message = "An unknown error occurred.";
            break;
    }

    console.error("Geolocation Error:", message);

    document.getElementById("locationResult").innerHTML = "Location could not be retrieved: " + message;
}

async function showWeatherByUserLocation(latitude, longitude) {


    let weatherData = await getWeatherByUserLocation(latitude, longitude);

    // Recupération la ville
    const city = weatherData["name"];

    // Recupération de meteo
    const weatherDataKelvin = weatherData["main"]["temp"];

    // Kelvin à celcius
    let weatherDataC = weatherDataKelvin - 273.15;
    weatherDataC = weatherDataC.toFixed(1);

    //Récupération humidité
    const humidityData = weatherData["main"]["humidity"];

    //Récuperation weather
    const descData = weatherData["weather"]["0"]["description"];

    //Récuperation emoji
    const weatherIDData = weatherData["weather"]["0"]["id"];
    let emoji = getWeatherEmoji(weatherIDData);

    // Récuperation du temps
    const timeStamp = weatherData["dt"];
    // Convert Unix timestamp (seconds) to a human-readable date and time string
    // Using England locale, short date and medium time format. ex: 10/12/2025, 15:07:44
    var date = new Date(timeStamp * 1000).toLocaleString("en-GB", {
        dateStyle: "short",
        timeStyle: "medium"
    });


    updateWeatherPanel({city, weatherDataC, humidityData, descData, emoji, date});
}

function updateWeatherPanel(data){

    htmlCountry.textContent = data.city;
    htmlDegree.textContent = data.temp + "°C";
    htmlHumidity.textContent = "Humidity : " + data.humidity + "%";
    htmlWeather.textContent = data.description;
    htmlEmoji.textContent = data.emoji;
    htmlLastUpdate.textContent = "Last updated: " + data.date;

}


