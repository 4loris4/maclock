"use strict";
const weatherElements = [
    new class extends WeatherElement {
        update(weather) {
            this.element.textContent = `${Math.round(weather.main.temp)}°`;
            if (props.dynamictemperaturecolor) {
                this.element.style.color = temperatureColor(props.usecelsius ? weather.main.temp : toCelsius(weather.main.temp));
            }
        }
    }("#temperature"),
    new class extends WeatherElement {
        update(weather) {
            const image = this.element.querySelector("img");
            const newSrc = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
            if (newSrc != image.src) {
                this.element.classList.add("loading");
                image.addEventListener("load", () => this.element.classList.remove("loading"), { once: true });
                image.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
            }
        }
    }("#weatherImage"),
    new class extends WeatherElement {
        update(weather) {
            this.element.textContent = weather.weather[0].description;
        }
    }("#weatherName"),
    new class extends WeatherElement {
        update(weather) {
            this.element.textContent = weather.name;
        }
    }("#location")
];
updateWeather();
setInterval(updateWeather, 30 * 60 * 1000);
document.querySelector("#retry").addEventListener("click", updateWeather);
async function updateWeather() {
    if (!props.enableweather)
        return;
    const weatherElement = document.querySelector("#weather");
    const errorElement = weatherElement.querySelector(".errorDetails .message");
    weatherElement.classList.remove("error");
    try {
        const request = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${props.weatherlocation}&units=${props.usecelsius ? "metric" : "imperial"}&appid=${props.weatherapikey}&lang=${props.locale}`);
        const [status, data] = [request.status, await request.json()];
        switch (status) {
            case 200:
                weatherElements.forEach(element => element.update(data));
                break;
            case 401:
                throw Error("unauthorized");
            case 404:
                throw Error("not-found");
            default:
                throw Error("unknown");
        }
    }
    catch (e) {
        let errorMessage;
        switch (e instanceof Error ? e.message : "") {
            case "unauthorized":
                errorMessage = props.weatherapikey?.trim() ? "Invalid API key" : "API key missing";
                break;
            case "not-found":
                errorMessage = "City not found";
                break;
            default:
                errorMessage = "Could not fetch data";
        }
        weatherElement.classList.add("error");
        errorElement.textContent = errorMessage;
    }
}
//# sourceMappingURL=weather.js.map