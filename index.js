/*
    JSON
    Object --> {}
    Array  --> []
    value  --> :
*/

const apikey = WEATHER_API_KEY;
const countries = document.querySelectorAll("path");
const sidePanel = document.querySelector("#side-panel");
const htmlCountry = document.querySelector("#country");
const htmlDegree = document.querySelector("#degree");
const htmlHumidity = document.querySelector("#humidity");
const htmlWeather = document.querySelector("#weather");
const htmlEmoji = document.querySelector("#emoji");
const htmlLastUpdate = document.querySelector("#lastUpdate");
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

  sidePanel.style.transform = "translateX(-400px)"
  
}

function ShowSidePanel(){
  
  sidePanel.style.transform = "translateX(0)"

}


async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Couldn't get the weather");
  } else {
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
    // Timestamp to normal date
    var fullDate = new Date(timeStamp * 1000);


    htmlCountry.textContent = city;
    htmlDegree.textContent = weatherDataC + "°C";
    htmlHumidity.textContent = "Humidity : " + humidityData + "%";
    htmlWeather.textContent = descData;
    htmlEmoji.textContent = emoji;
    htmlLastUpdate.textContent = "Last updated:" + fullDate;

    console.log(weatherData);
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
