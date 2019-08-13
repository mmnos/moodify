$(document).ready(function () {

    // weather variables
    let userZip,
        weatherData,
        cityName,
        temp,
        weather

    let getWeather = function () {

        // queryURL = `api.openweathermap.org/data/2.5/weather?zip=${userZip}&APPID=01b094dd158ecf4fb77c7c5db98a6ad6`
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?zip=${userZip}&APPID=01b094dd158ecf4fb77c7c5db98a6ad6`

        $.get(queryURL).then(function (response) {

            weatherData = response;

            console.log(weatherData);

            // display location
            cityName = weatherData.name;
            let cityP = $("<p>").text(cityName);
            $("div#city").append(cityP);

            // display weather
            weather = weatherData.weather[0].description;
            let weatherP = $("<p>").text(weather);
            $("div#weather-icon").append(weatherP);

            // display temperature
            temp = (parseInt(weatherData.main.temp) - 273.15) * 9 / 5 + 32;
            temp = Math.round(100 * temp) / 100
            let tempP = $("<p>").text(temp);
            $("div#temperature").append(tempP);

        });

    };

    $("#submitZip").on("click", function(event) {

        // holds user input
        userZip = $("#zipcode").val().trim();

        // "^" indicates the beginning of input
        // "$" indicates the end of input
        // "d{5}" wants the users input to be only 5 digits long, EX : 90210 or in the second statement after the "|",
        // it allows 5 digits followed by a hyphen and 4 more digits, EX : 90210-1234
        let regex = /^\d{5}$|^\d{5}-\d{4}$/;

        // if user input is valid, it'll display the current weather and location of specified area
        if (regex.test(userZip)) {

            getWeather();

        } else {

            console.log("Please enter a valid zipcode");

        }

    });

    // var to hold access token
    let accessToken = "BQD2F81CwEzh8Z7znYV_43VizWZuPUt_y6fK1xaK2j0g2jll6xHk4Y-gMY3u69j0eLxt04Ln05fpXXBJjLFrCaKYme6gTP2_X1bG4WA5RMhjq2HItxzGxRlzHI5M5EqzA2jQtL3tuUIduLIEWh3a2gCbySM-ShYPYcgzvB8QYeCgYBP5Q-VFIJk99ceA_rYDAr8Bvfsh67-x";

    // makes an ajax request to search the spotify api with recommended playlists
    $.get({

        url: 'https://api.spotify.com/v1/search?q=rainy&type=playlist',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {

            console.log(response);

        }

    });

});