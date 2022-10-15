let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let p = document.querySelector("#today-time");
p.innerHTML = `${day}, ${hours}:${minutes}`;

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusLink * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

// Bonus Feature
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//week5 weather api
function searchEngine(event) {
  event.preventDefault();
  let city = document.querySelector("#cityName");
  let h2 = document.querySelector("#city");
  searchCity(city.value);
  h2.innerHTML = `${city.value}`;
}

let mainButton = document.querySelector("button");
mainButton.addEventListener("click", searchEngine);

function showWeather(response) {
  let h1 = document.querySelector("#temperature");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${temperature}°`;
  console.log(temperature);
  console.log(response);
  // let degree = document.querySelector("celsium");
  //degree.innerHTML = `${temperature}`;
  let humidity = document.querySelector("#humidity");
  console.log(humidity);
  humidity.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  console.log(wind);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#description");
  console.log(description);
  descriptionElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function searchCity(city) {
  let apiKey = "2dc8d5bfb3f0f03b39d7f08468a66c84";
  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
navigator.geolocation.getCurrentPosition(retrievePosition);
let locationButton = document.querySelector("#button_location");
locationButton.addEventListener("click", retrievePosition);
