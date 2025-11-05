/*
    JSON
    Object --> {}
    Array  --> []
    value  --> :
*/

const apikey = WEATHER_API_KEY;
const countries = document.querySelectorAll("path");


countries.forEach(country =>{
  country.addEventListener("click", function(){
    countryClass = country.getAttribute('class');

    if (countryClass === null) {
      countryClass = country.getAttribute('name');
    }
    showWeather(countryClass); 
  })
})


async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&&appid=${apikey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Couldn't get the weather");
  } else {
    return await response.json();
  }
}

async function showWeather(city) {
  
    let weatherData = await getWeather(city);
    const weatherDataKelvin = weatherData["main"]["temp"];

    
    let weatherDataC = weatherDataKelvin - 273.15;
    weatherDataC = weatherDataC.toFixed(1);
    console.log(`The weather of ${city} is ${weatherDataC}`);
}
