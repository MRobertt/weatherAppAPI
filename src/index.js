import "./styles.css";

// la .result punem de aici
// .weather-icon tot de aici
// data.country data.name - span
// data.weather[0].description - paragraph
// data.main.temp / data.main.feels_like
//data[0].name, .lat, .lon => in fetch final.
let searchBtn = document.querySelector(".search-button");
let getInfo = () => {
  //user input in search bar
  let userInput = document.querySelector(".search-bar").value;
  if (userInput.length === 0) {
    document.querySelector(
      ".error"
    ).innerHTML = `<h1>Field cannot be empty!</h1>`;
  } else {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        userInput +
        "&appid=4b1a5344816ffe8122df9308ae3f69e7"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        userInput = "";
        console.log(data);
        let weather = data.weather[0].main;
        let weatherDescription = data.weather[0].description;
        let city = data.name;
        let temperatureK = data.main.temp;
        let temperatureC = Math.round(temperatureK - 273.15);
        let feelsLikeK = data.main.feels_like;
        let feelsLikeC = Math.round(feelsLikeK - 273.15);

        document.querySelector(".result").innerHTML = `
        <h2>${city}</h2>
        <p>Temperature: ${temperatureC}°C </p>
        <p>Real feel: ${feelsLikeC}°C</p>
        <span>Clouds: ${weather} /</span> <span>Sky: ${weatherDescription}</span>
        `;
      })
      .catch((error) => {
        document.querySelector(".error").innerHTML = `<h1>Not found</h1>`;
      });
  }
};

window.addEventListener("load", getInfo);
searchBtn.addEventListener("click", getInfo);
