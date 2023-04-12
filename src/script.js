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
}

function SearchcityWeather(city, lon, lat) {
  let Apikey = "b3584c6545a2013b0440f785b9e39t5o";
  let Url = `https://api.shecodes.io/weather/v1/current?query=${city}&lon=${lon}&lat=${lat}&key=${Apikey}&units=metric`;
  axios.get(Url).then(DisplayTemp);
}

function getCity(event) {
  event.preventDefault();
  let input = document.querySelector(".form-control");
  SearchcityWeather(input.value);
}
let Search = document.querySelector(".SearchforCity");
Search.addEventListener("submit", getCity);

function Celsiusahange(event) {
  event.preventDefault();
  let Tempture = document.querySelector(".temp");
  let unitForT = document.querySelector(".unitT");
  Tempture.innerHTML = celsiustemperature;
  unitForT.innerHTML = "°C";
}
let celsiustemperature = null;

let Cbtn = document.querySelector(".c");
Cbtn.addEventListener("click", Celsiusahange);

function FarenChange(event) {
  event.preventDefault();
  let Tempture = document.querySelector(".temp");
  let unitForT = document.querySelector(".unitT");
  let fahrenheiTemperature = (celsiustemperature * 9) / 5 + 32;
  Tempture.innerHTML = Math.round(fahrenheiTemperature);
  unitForT.innerHTML = "°F";
}

let Fbtn = document.querySelector(".f");
Fbtn.addEventListener("click", FarenChange);

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let Apikey = "b3584c6545a2013b0440f785b9e39t5o";
  let Url = `https://api.shecodes.io/weather/v1/current?query=${city}&lon=${lon}&lat=${lat}&key=${Apikey}&units=metric`;
  axios.get(Url).then(DisplayTemp);
}

navigator.geolocation.getCurrentPosition(getLocation);

SearchcityWeather(getLocation);
