// get all necessary ellement
const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("location-input");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

// Default city
let cityInput = "Cairo";

cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;

    fetchWeatherData();

    app.style.opacity = 0;
  });
});

form.addEventListener('submit', (event) => {
  if (search.value.length == 0) {
    alert("Please enter a search city");
  } else {
    cityInput = search.value;

    fetchWeatherData();

    search.value = "";

    app.style.opacity = 0;
  }

  event.preventDefault();
});

function daysOfTheWeek(day, month, year) {
  // Create a Date object with the given parameters
  const date = new Date(year, month - 1, day); // Note: month is 0-indexed

  // Use the built-in toLocaleDateString() method to get the day name
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

  return dayName;
}

function fetchWeatherData() {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=7b8f9e9f0c3a44c09fe204302232612&q=${cityInput}&aqi=yes`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      temp.innerHTML = data.current.temp_c + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text;

      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      dateOutput.innerHTML = `${daysOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
      timeOutput.innerHTML = time;
      nameOutput.innerHTML = data.location.name;
    
      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );
    //   console.log(iconId)
      icon.src = "./assets/images/weather/64x64/" + iconId;

      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      //Set default time of day day or night
      let timeOfDay = 'day';
      //Get the unique for each weather condition
      const code = data.current.condition.code;
      //Change to night if its night time in the city
      if(!data.current.is_day){
        timeOfDay = 'night';
      }

      if(code === 1000){
        //Set the background image to clear if the weather is clear
        app.style.backgroundImage = `url(./assets/images/${timeOfDay}/clear.jpg)`;
        
        btn.style.background = "#e5ba92";
        if(timeOfDay == "night"){
          btn.style.background = "#181e27"
        }
        
      }else if(
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
        ){
          app.style.backgroundImage = `url(./assets/images/${timeOfDay}/cloud.jpg)`;

          btn.style.background = "#fa6d1b";
          if(timeOfDay == "night"){
            btn.style.background = "#181e27";
          }
        }else if(
          code == 1063 ||
          code == 1069 ||
          code == 1072 ||
          code == 1150 ||
          code == 1180 ||
          code == 1183 ||
          code == 1186 ||
          code == 1189 ||
          code == 1192 ||
          code == 1195 ||
          code == 1204 ||
          code == 1207 ||
          code == 1240 ||
          code == 1243 ||
          code == 1246 ||
          code == 1249 ||
          code == 1252
          ){
            app.style.backgroundImage = `url(./assets/images/${timeOfDay}/rain.jpg)`;
  
            btn.style.background = "#647d75";
            if(timeOfDay == "night"){
              btn.style.background = "#325c80";
            }

        }else {
          app.style.backgroundImage = `url(./assets/images/${timeOfDay}/snow.jpg)`;
  
            btn.style.background = "#4d72aa";
            if(timeOfDay == "night"){
              btn.style.background = "#1b1b1b";
            }
        }

        app.style.opacity = 1;
    })
    .catch(() => {
      alert("City not found, please try again");
      app.style.opacity = 1;
    });
}

fetchWeatherData();

app.style.opacity = 1;
