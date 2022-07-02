import './style.css';
import { decode } from 'html-entities';
import { convertToFahrenheit, convertToCelsius, convertCountryName } from "./conversions.js";
import searchImage from "./images/search-button.png";
import sunImage from "./images/sun.png";

const input = document.querySelector("input");
const search = document.getElementById("searchBtn");
const name = document.getElementById("name");
const temp = document.getElementById("temp");
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
const searchBtn = document.getElementById("searchBtn");
const sun = document.getElementById("sun");

let location = "tokyo";
getWeather();

async function getWeather() {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=0a10f192bc6dd2fa1798de607d95da55`, {mode: "cors"});
        const data = await response.json();
    
        name.textContent = data.name + convertCountryName(data.sys.country);
        temp.textContent = convertToFahrenheit(data.main.temp) + degreeSymbol;
        main.textContent = data.weather[0].main;
        wind.textContent = `Wind: ${Math.round(data.wind.speed) + " mph"}`;
        high.textContent = `High: ${convertToFahrenheit(data.main.temp_max)}${degreeSymbol}`;
        low.textContent = `Low: ${convertToFahrenheit(data.main.temp_min)}${degreeSymbol}`;
        addImageSrc();
        addEventListeners(data.main.temp, data.main.temp_max, data.main.temp_min);
    
    } catch(error) {
        container.classList.add("hidden");
        errorMessage.textContent = "No such city exists!";
        errorMessage.classList.add("errorMessage");
        page.appendChild(errorMessage);
    }
}

function addImageSrc() {
    searchBtn.src = searchImage;
    sun.src = sunImage;
}

function addEventListeners(currentTemp, currentHigh, currentLow) {
    convertToF.onclick = () => {
        temp.textContent = convertToFahrenheit(currentTemp) + degreeSymbol;
        high.textContent = `High: ${convertToFahrenheit(currentHigh)}${degreeSymbol}`;
        low.textContent = `Low: ${convertToFahrenheit(currentLow)}${degreeSymbol}`;
    }

    convertToC.onclick = () => {
        temp.textContent = convertToCelsius(currentTemp) + degreeSymbol;
        high.textContent = `High: ${convertToCelsius(currentHigh)}${degreeSymbol}`;
        low.textContent = `Low: ${convertToCelsius(currentLow)}${degreeSymbol}`;
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
}







