import './style.css';

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

    name.textContent = data.name;
    temp.textContent = convertTemp(data.main.temp);
    feelsLikeLabel.textContent = "Feels like";
    feelsLike.textContent = convertTemp(data.main.feels_like); 
    main.textContent = data.weather[0].main;
    windLabel.textContent = "Wind";
    wind.textContent = data.wind.speed;
    highLabel.textContent = "High";
    high.textContent = convertTemp(data.main.temp_max);
    lowLabel.textContent = "Low";
    low.textContent = convertTemp(data.main.temp_min);

}

function convertTemp(temp) {
    return Math.round(temp - 273);
}