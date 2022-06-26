import './style.css';
var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
import {decode} from 'html-entities';
import { getWeather } from './getWeather';

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


