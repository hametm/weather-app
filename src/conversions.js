var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

function convertToFahrenheit(temp) {
    const convertToF = document.getElementById("fahrenheit");
    const convertToC = document.getElementById("celsius");
    convertToC.classList.remove("currentTemp");
    convertToF.classList.add("currentTemp");
    return Math.round((((temp - 273)) * (9/5)) + 32);
}

function convertToCelsius(temp) {
    const convertToF = document.getElementById("fahrenheit");
    const convertToC = document.getElementById("celsius");
    convertToF.classList.remove("currentTemp");
    convertToC.classList.add("currentTemp");
    return Math.round(temp - 273);
}

function convertCountryName(name) {
    if (name === "US") return ", USA";
    if (name === "GB") return ", U.K.";
    return`, ${(countries.getName(name, "en"))}`;
}

export { convertToFahrenheit, convertToCelsius, convertCountryName };