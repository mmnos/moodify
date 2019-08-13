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

        userZip = $("#zipcode").val().trim();
        console.log(userZip);
        getWeather();

    });

    // var to hold access token
    let accessToken = "BQAApIzM8UFXMi2OfqBi2KQE3zmJlk-INp40fSN3YlxRFmhL-N-Z5hiHsSzXJMDl0ml1PF4AfYjUAZvPFHKXujm42l8O5sN2fcC9QHb6yo6WvhPy1XDcTSzamwizvyOOFsLAZpeYXtznDhfp6BniB9eB8Nq8tC8lfoh0Iv4gnyHptO1L8zhxagKWZSefuvw1j_UHn4Iv5q7FtJg";

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