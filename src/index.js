let writtenCity,
  transformation2do,
  writtenCity2Display,
  feelLikes2Transform,
  temp,
  tempfeelsLike,
  units,
  wind;

// let $ = window.jQuery;
let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
let lat, lon;
let exclude = "minutely,hourly,daily";
let apiUrl;
function celsiustoFahrenheit(degree) {
  return Math.round((degree * 9) / 5 + 32);
}
function fahrenheittoCelsius(degree) {
  return Math.round(((degree - 32) * 5) / 9);
}
function mps2mph(velocity) {
  return Math.round(velocity * 2.237);
}
function mph2mps(velocity) {
  return Math.round(velocity / 2.237);
}
function updateUnits() {
  transformation2do = document.querySelector("#unit").innerHTML;
  if (transformation2do === "°F") {
    return "metric";
  }
  return "imperial";
}
function getCurrentPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log(`My current latitude is ${lat}`);
  console.log(`My current longitude is ${lon}`);
  units = updateUnits();
  let cityFromLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(cityFromLocationUrl).then(showWeatherSelectedCity);
}
function updateWeatherConditions(weather) {
  let currentWeather = weather[0];
  let icon = "";
  let description = "";
  // <i class="fa-solid fa-moon"></i>
  // <i class="fa-solid fa-smog"></i>
  // <i class="fa-solid fa-snowflake"></i>
  //<i class="fa-solid fa-cloud"></i>
  //<i class="fa-solid fa-cloud-moon"></i>
  // <i class="fa-solid fa-cloud-moon-rain"></i>
  // <i class="fa-solid fa-tornado"></i>
  //<i class="fa-solid fa-star-and-crescent"></i>
  //<i class="fa-solid fa-umbrella"></i>
  description = `${currentWeather.description}`;
  description = description.toUpperCase();
  if (200 <= currentWeather.id && currentWeather.id <= 232) {
    icon = `<i class="fa-solid fa-cloud-bolt"></i>`;
  } else if (currentWeather.id === 800) {
    if (currentWeather.icon === "01n")
      icon = `<i class="fa-solid fa-moon"></i>`;
    else if (currentWeather.icon === "01d")
      icon = `<i class="fa-solid fa-sun"></i>`;
  } else if (300 <= currentWeather.id && currentWeather.id <= 321) {
    if (currentWeather.icon === "09n")
      icon = `<i class="fa-solid fa-cloud-moon-rain"></i>`;
    else if (currentWeather.icon === "09d") {
      icon = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
    }
  } else if (currentWeather.id === 500) {
    icon = `<i class="fa-solid fa-cloud-rain"></i>`;
  } else if (500 < currentWeather.id && currentWeather.id <= 531) {
    icon = `<i class="fa-solid fa-umbrella"></i>`;
  } else if (600 <= currentWeather.id && currentWeather.id <= 622) {
    icon = `<i class="fa-solid fa-snowflake"></i>`;
  } else if (currentWeather.id === 762) {
    icon = `<i class="fa-solid fa-volcano"></i>`;
  } else if (currentWeather.id === 781) {
    icon = `<i class="fa-solid fa-tornado"></i>`;
  } else if (701 <= currentWeather.id && currentWeather.id <= 761) {
    icon = `<i class="fa-solid fa-smog"></i>`;
  } else if (currentWeather.id === 771) {
    icon = `<i class="fa-solid fa-wind"> </i>`;
  } else if (currentWeather.id === 801 || currentWeather.id === 802) {
    if (currentWeather.icon === "02n" || currentWeather.icon === "03n")
      icon = `<i class="fa-solid fa-cloud-moon"></i>`;
    else if (currentWeather.icon === "02d" || currentWeather.icon === "03d")
      icon = `<i class="fa-solid fa-cloud-sun"></i>`;
  } else if (currentWeather.id === 803 || currentWeather.id === 804) {
    icon = `<i class="fa-solid fa-cloud"></i>`;
  }

  document.getElementById("condition").innerHTML = icon + " " + description;
}
function showWeatherSelectedCity(response) {
  temp = response.data.main.temp;
  tempfeelsLike = response.data.main.feels_like;
  let temp2Display = Math.round(temp);
  let tempfeelsLike2Display = Math.round(tempfeelsLike);
  let hum = response.data.main.humidity;
  let rain = response.data.rain;
  wind = response.data.wind.speed;
  updateWeatherConditions(response.data.weather);
  document.getElementById(
    "humidity"
  ).innerHTML = `<i class="fa-solid fa-droplet"></i> HUMIDITY: ${hum}%`;
  feelLikes2Transform = tempfeelsLike;
  document.querySelector("span.temperature").innerHTML = temp2Display;
  let unit = "°C";
  let unitVelocity = "m/s";
  if (units === "imperial") {
    unit = "°F";
    unitVelocity = "mph";
  }
  document.getElementById(
    "feelsLike"
  ).innerHTML = `<i class="fa-solid fa-temperature-low"></i>FEELS LIKE: ${tempfeelsLike2Display}${unit}`;
  document.getElementById(
    "wind"
  ).innerHTML = `<i class="fa-solid fa-wind"> </i> WIND: ${Math.round(
    wind
  )} ${unitVelocity}`;
  console.log(response.data);
  console.log(response.data.weather[0].description);
  if (rain !== undefined) {
    document.getElementById(
      "precipitation"
    ).innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>
                PRECIPITATION: ${Object.values(rain)[0]} mm`;
  } else {
    document.getElementById(
      "precipitation"
    ).innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>
                PRECIPITATION: 0%`;
  }
  writtenCity2Display = response.data.name;
  document.querySelector("h1").innerHTML = writtenCity2Display;
  console.log(
    `The current temperature in ${writtenCity2Display} is ${temp}${unit}`
  );
}
function updateCity() {
  writtenCity = document.getElementById("city").value;
  writtenCity = writtenCity.trim();
  writtenCity = writtenCity.toLowerCase();
  units = updateUnits();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${writtenCity}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherSelectedCity);
}
function updateTempWind(transformation2do) {
  let temp2Transform = temp;
  let newTemp;
  let unitVelocity;
  if (transformation2do === "°F") {
    wind = mps2mph(wind);
    unitVelocity = "mph";
    newTemp = celsiustoFahrenheit(temp2Transform);
    feelLikes2Transform = celsiustoFahrenheit(feelLikes2Transform);
    document.querySelector("span.temperature").innerHTML = newTemp;
    document.querySelector("span.units").innerHTML = "°F|";
    document.getElementById("unit").innerHTML = "°C";
    document.getElementById(
      "feelsLike"
    ).innerHTML = `<i class="fa-solid fa-temperature-low"></i>FEELS LIKE: ${feelLikes2Transform}°F`;
  } else {
    wind = mph2mps(wind);
    unitVelocity = "m/s";
    newTemp = fahrenheittoCelsius(temp2Transform);
    feelLikes2Transform = fahrenheittoCelsius(feelLikes2Transform);
    document.querySelector("span.temperature").innerHTML = newTemp;
    document.querySelector("span.units").innerHTML = "°C|";
    document.getElementById("unit").innerHTML = "°F";
    document.getElementById(
      "feelsLike"
    ).innerHTML = `<i class="fa-solid fa-temperature-low"></i>FEELS LIKE: ${feelLikes2Transform}°C`;
  }
  document.getElementById(
    "wind"
  ).innerHTML = `<i class="fa-solid fa-wind"> </i> WIND: ${wind} ${unitVelocity}`;
  temp = newTemp;
  transformation2do = document.querySelector("#unit").innerHTML;
}
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    updateCity();
  } else return;
});

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let formattedDate = {
    day: `${days[date.getDay()]}`,
    month: `${months[date.getMonth()]}`,
    date: `${date.getDate()}`,
    year: `${date.getFullYear()}`,
    time: `${date.toLocaleTimeString("en-US")}`,
  };
  return formattedDate;
}

$(function () {
  let date = new Date();
  let obj = formatDate(date);
  document.querySelector("#day").innerHTML = obj.day;
  document.querySelector(
    "#date"
  ).innerHTML = `${obj.month} ${obj.date}, ${obj.year}`;
  document.querySelector("#time").innerHTML = obj.time;
  units = updateUnits();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherSelectedCity);
  document.querySelector("#unit").addEventListener("click", (event) => {
    transformation2do = document.querySelector("#unit").innerHTML;
    updateTempWind(transformation2do);
  });
  document
    .getElementById("current-weather")
    .addEventListener("click", (event) => {
      navigator.geolocation.getCurrentPosition(getCurrentPosition);
      document.querySelector("#city").value = "";
    });
});
