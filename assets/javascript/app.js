$(document).ready(function () {

    // weather variables
    let userZip,
        weatherData,
        cityName,
        temp,
        weather

    let getWeather = function () {

        // queryURL = `api.openweathermap.org/data/2.5/weather?zip=${userZip}&APPID=01b094dd158ecf4fb77c7c5db98a6ad6`
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?zip=03053&APPID=01b094dd158ecf4fb77c7c5db98a6ad6`

        $.get(queryURL).then(function (response) {
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
            temp = Math.round(100 * temp) / 100
            let tempP = $("<p>").text(temp);
            $("div#temperature").append(tempP)

        });

    };

    getWeather();

    // builds query params
    let queryParam = {

        client_id: "c7858a53b3d84a809aa7b91a80a80e08",
        response_type: "code",
        redirect_uri: "https://mmnos.github.io/Project1/",
        q: "rihanna",
        limit: 3,
        scope: "playlist-read-private"

    };

    // converts the query param object to a string for the url
    let queryParamString = $.param(queryParam);
    console.log(queryParamString);

    // var that holds the complete url with custom search results
    let completeSpotifyURL = spotifyURL + queryParamString;
    console.log(completeSpotifyURL);

    // var to hold access token
    let accessToken = "BQCTvLBb7Ddm9WkgEwASseG7aHHx-cQnR23SyDBcT-Vr4GCzwQVsmC6KBK4AFzXS_JMlJQ8X9MVEvpRfzozt676UcWbtBMyNRToKk8sXhKH-YBSPKwi6vlZlYIpBYKy6xRNVTXwHr6BW1XAZH1naeZi8Fc3RtjgfUagQbox-nGEQQK8WpIXxm-OFeov2h0DXFkUhDpX7P784y1M";

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