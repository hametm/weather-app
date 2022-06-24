import './style.css';

let location = "stockholm";

async function getWeather() {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=0a10f192bc6dd2fa1798de607d95da55`, {mode: "cors"});
    const data = await response.json();

    for (let key in data) {
        console.log(data[key]);
    }
}

getWeather();