import './style.css';
var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
import {decode} from 'html-entities';


const input = document.querySelector("input");
const search = document.getElementById("searchBtn");
const name = document.getElementById("name");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feels_like");
const main = document.getElementById("main");
const wind = document.getElementById("wind");
const high = document.getElementById("temp_max");
const low = document.getElementById("temp_min");
const container = document.getElementById("weather");
const page = document.querySelector("main");
const errorMessage = document.createElement("h1");
const convertToF = document.getElementById("fahrenheit");
const convertToC = document.getElementById("celsius");
const degreeSymbol = decode("&deg;");

let location = "tokyo";

getWeather();


async function getWeather() {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=0a10f192bc6dd2fa1798de607d95da55`, {mode: "cors"});
        const data = await response.json();
    
        name.textContent = data.name + convertCountryName(data.sys.country);
        temp.textContent = convertToFahrenheit(data.main.temp) + degreeSymbol;
        // feelsLike.textContent = `Feels like ${convertToFahrenheit(data.main.feels_like)}${degreeSymbol}`; 
        main.textContent = data.weather[0].main;
        wind.textContent = `Wind: ${Math.round(data.wind.speed) + " mph"}`;
        high.textContent = `High: ${convertToFahrenheit(data.main.temp_max)}${degreeSymbol}`;
        low.textContent = `Low: ${convertToFahrenheit(data.main.temp_min)}${degreeSymbol}`;
        changeTemp(data.main.temp, data.main.temp_max, data.main.temp_min);
    
    } catch(error) {
        container.classList.add("hidden");
        errorMessage.textContent = "No such city exists!";
        errorMessage.classList.add("errorMessage");
        page.appendChild(errorMessage);
    }
   
}

function changeTemp(dTemp, dHigh, dLow) {
    convertToF.onclick = () => {
        temp.textContent = convertToFahrenheit(dTemp) + degreeSymbol;
        high.textContent = `High: ${convertToFahrenheit(dHigh)}${degreeSymbol}`;
        low.textContent = `Low: ${convertToFahrenheit(dLow)}${degreeSymbol}`;
    }

    convertToC.onclick = () => {
        temp.textContent = convertToCelsius(dTemp) + degreeSymbol;
        high.textContent = `High: ${convertToCelsius(dHigh)}${degreeSymbol}`;
        low.textContent = `Low: ${convertToCelsius(dLow)}${degreeSymbol}`;
    }
}

function convertToFahrenheit(temp) {
    convertToC.classList.remove("currentTemp");
    convertToF.classList.add("currentTemp");
    return Math.round((((temp - 273)) * (9/5)) + 32);
}

function convertToCelsius(temp) {
    convertToF.classList.remove("currentTemp");
    convertToC.classList.add("currentTemp");
    return Math.round(temp - 273);
}

function convertCountryName(name) {
    if (name === "US") return ", USA";
    if (name === "GB") return ", U.K.";
    return`, ${(countries.getName(name, "en"))}`;
}


input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        search.click();
    }
})

search.onclick = () => {
    container.classList.remove("hidden");
    errorMessage.remove();
    location = input.value;
    getWeather();
}


