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

export { changeTemp, convertToFahrenheit, convertToCelsius, convertCountryName };