import { changeTemp, convertToFahrenheit, convertCountryName } from './functions';


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

export { getWeather };