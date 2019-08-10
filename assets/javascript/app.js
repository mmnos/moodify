
//weather variables
let userZip,
    weatherData,
    cityName,
    temp,
    weather



let getWeather = function() {

  // queryURL = `api.openweathermap.org/data/2.5/weather?zip=${userZip}&APPID=01b094dd158ecf4fb77c7c5db98a6ad6`
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?zip=03053&APPID=01b094dd158ecf4fb77c7c5db98a6ad6`
  
  $.get(queryURL).then(function(response){
    weatherData = response;

    console.log(weatherData);

    //display location
    cityName = weatherData.name;
    let cityP = $("<p>").text(cityName);
    $("div#city").append(cityP);

    // display weather
    weather = weatherData.weather[0].description;
    let weatherP = $("<p>").text(weather);
    $("div#weather-icon").append(weatherP);

    // display temperature
    temp = (parseInt(weatherData.main.temp) - 273.15) * 9 / 5 + 32;
    temp = Math.round(100 * temp)/100
    let tempP = $("<p>").text(temp);
    $("div#temperature").append(tempP)

  });
}

getWeather();