import './style.css';
var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
import {decode} from 'html-entities';

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
    const degreeSymbol = decode("&deg;");

    name.textContent = data.name + ", " + (countries.getName(data.sys.country, "en"));
    temp.textContent = convertToFahrenheit(data.main.temp) + degreeSymbol;
    feelsLike.textContent = `Feels like: ${convertToFahrenheit(data.main.feels_like)}${degreeSymbol}`; 
    main.textContent = data.weather[0].main;
    wind.textContent = `Wind: ${Math.round(data.wind.speed) + "mph"}`;
    high.textContent = `High: ${convertToFahrenheit(data.main.temp_max)}${degreeSymbol}`;
    low.textContent = `Low: ${convertToFahrenheit(data.main.temp_min)}${degreeSymbol}`;

}

function convertToFahrenheit(temp) {
    return Math.round((((temp - 273)) * (9/5)) + 32);
}