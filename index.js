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


countries.forEach(country =>{
  country.addEventListener("click", function(){

    // S'il n'y a pas de classe, on récupère le name
    countryClass = country.getAttribute('class');
    if (countryClass === null) {
      countryClass = country.getAttribute('name');
    }
    showWeather(countryClass);
    ShowSidePanel();
  })
})

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

    htmlCountry.textContent = city;
    htmlDegree.textContent = weatherDataC;

    
}
