import './style.css';
var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const input = document.querySelector("input");
const submit = document.getElementById("submit");
const name = document.getElementById("name");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feels_like");
const main = document.getElementById("main");
const wind = document.getElementById("wind");
const high = document.getElementById("temp_max");
const low = document.getElementById("temp_min");

let location = "tokyo";

// Just for now
getWeather();

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        submit.click();
    }
})

submit.onclick = () => {
    location = input.value;
    getWeather();
}

async function getWeather() {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=0a10f192bc6dd2fa1798de607d95da55`, {mode: "cors"});
    const data = await response.json();

    const feelsLikeLabel = document.getElementById("feelsLikeLabel");
    const windLabel = document.getElementById("windLabel");
    const highLabel = document.getElementById("highLabel");
    const lowLabel = document.getElementById("lowLabel");

    name.textContent = data.name + ", " + (countries.getName(data.sys.country, "en"));
    temp.textContent = convertToFahrenheit(data.main.temp);
    feelsLikeLabel.textContent = "Feels like";
    feelsLike.textContent = convertToFahrenheit(data.main.feels_like); 
    main.textContent = data.weather[0].main;
    windLabel.textContent = "Wind";
    wind.textContent = Math.round(data.wind.speed) + "mph";
    highLabel.textContent = "High";
    high.textContent = convertToFahrenheit(data.main.temp_max);
    lowLabel.textContent = "Low";
    low.textContent = convertToFahrenheit(data.main.temp_min);

}

function convertToFahrenheit(temp) {
    return Math.round((((temp - 273)) * (9/5)) + 32);
}