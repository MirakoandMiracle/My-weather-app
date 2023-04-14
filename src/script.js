function formatDate(timestamp) {
  let current = new Date(timestamp);
  let hours = current.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = current.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[current.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function DisplayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".weather-forecast");
  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastday, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="col-4 col-lg-2">
                <div class="next6days">${formatDay(forecastday.time)}</div>
                <img
                  src="${forecastday.condition.icon_url}"
                  alt="${forecastday.condition.icon}" class="forecastimg"
                />
                <div class="forecastTemp">
                  <span class="max">${Math.round(
                    forecastday.temperature.maximum
                  )}</span><span class="min">${Math.round(
          forecastday.temperature.minimum
        )}</span>
                </div>
              </div>`;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}
function getForecast(coord) {
  let Apikey = "b3584c6545a2013b0440f785b9e39t5o";
  let Url = `https://api.shecodes.io/weather/v1/forecast?lon=${coord.longitude}&lat=${coord.latitude}&key=${Apikey}&units`;
  axios.get(Url).then(DisplayForecast);
}
function DisplayTemp(response) {
  let city = document.querySelector("#city");
  let country = document.querySelector(".country");
  let date = document.querySelector("#date");
  let Tempture = document.querySelector(".temp");
  let unitForT = document.querySelector(".unitT");
  let weathercondition = document.querySelector("#weather-condition");
  let icon = document.querySelector(".icon");
  let wind = document.querySelector(".wind");
  let humidity = document.querySelector(".humidity");
  country.innerHTML = response.data.country;
  city.innerHTML = response.data.city;
  weathercondition.innerHTML = response.data.condition.description;
  unitForT.innerHTML = "°C";
  celsiustemperature = Math.round(response.data.temperature.current);
  Tempture.innerHTML = celsiustemperature;
  icon.setAttribute("src", response.data.condition.icon_url);
  icon.setAttribute("alt", response.data.condition.icon);
  date.innerHTML = formatDate(response.data.time * 1000);
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  humidity.innerHTML = `${response.data.temperature.humidity}% `;
  getForecast(response.data.coordinates);
}
function SearchcityWeather(city) {
  let Apikey = "b3584c6545a2013b0440f785b9e39t5o";
  let Url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${Apikey}&units=metric`;
  axios.get(Url).then(DisplayTemp);
}

function getCity(event) {
  event.preventDefault();
  let input = document.querySelector(".form-control");
  if (input.value.length === 0) {
    alert("Please type a city");
    return;
  }
  SearchcityWeather(input.value);
}
let Search = document.querySelector(".SearchforCity");
Search.addEventListener("submit", getCity);

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let Apikey = "b3584c6545a2013b0440f785b9e39t5o";
  let Url = `https://api.shecodes.io/weather/v1/current?query=${city}&lon=${lon}&lat=${lat}&key=${Apikey}&units=metric`;
  axios.get(Url).then(DisplayTemp);
}

navigator.geolocation.getCurrentPosition(getLocation);

SearchcityWeather(getLocation);
