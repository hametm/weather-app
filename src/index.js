import './style.css';

const input = document.querySelector("input");
const list = document.querySelectorAll("li");
const submit = document.getElementById("submit");
const name = document.getElementById("name");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feels_like");
const main = document.getElementById("main");
const wind = document.getElementById("wind");
let location = "tokyo";

// Just for now
getWeather();

submit.onclick = () => {
    location = input.value;
    getWeather();
}

async function getWeather() {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=0a10f192bc6dd2fa1798de607d95da55`, {mode: "cors"});
    const data = await response.json();

    name.textContent = data.name;
    temp.textContent = data.main.temp;
    feelsLike.textContent = data.main.feels_like;
    main.textContent = data.weather[0].main;
    wind.textContent = data.wind.speed;

}