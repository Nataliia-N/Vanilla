function formatDay (timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
return days[day];  
}

function displayForecast (response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 5 ){
  forecastHtml = forecastHtml + `
      <div class="col-2">
          <div class="weather-forecast-date">
          ${formatDay(forecastDay.dt)}
          </div>
      <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" id="icon" height="40px">
          <div class="weather-forecast-temperature">${Math.round(forecastDay.temp.max)} °/<span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)} °</span> 
          </div>
      </div>
`;
}
  }
  );

forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      let day = days[date.getDay()];
      if (minutes < 10){
        minutes = `0${minutes}`; 
      }
      if (hours < 10) {
        hours = `0${hours}`
      }
     let formattedDate =`${day} ${hours}:${minutes}`;
     return formattedDate;
}

function getForecast(coordinates) {
  let apiKey = "e9e196ee12c6e5ec0599f3bdf6ebd323";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
    celsiusTemperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    getForecast(response.data.coord);

}

function search(city){
  let apiKey = "e9e196ee12c6e5ec0599f3bdf6ebd323";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  }

  function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = celsiusTemperature;
  }
  
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9)/ 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
} 

let celsiusTemperature = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#Fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Lisbon");

