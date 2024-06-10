function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                class="weather-app-icon"
                alt=""
              />`;
}
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "90203025o3babt534f7259cd055af2f1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="row">
            <div class="col-2">
              <div class="weather-forecast-date">${day}</div>
              <div class="forecast-icon">
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
                  alt=""
                  width="36"
                />
              </div>
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max"> 18°</span> /

                <span class="weather-forecast-temperature-min"> 12°</span>
              </div>
            </div>
          </div>`;
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
displayForecast();
