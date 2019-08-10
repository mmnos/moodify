let spotifyURL = "https://accounts.spotify.com/authorize?";

// grabs the zipcode from user
// let $search = $("#").val();

$(document).ready(function () {

    //weather variables
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
    }

    getWeather();

    // builds query params
    let queryParam = {
        client_id: "ff7637f2ebb2489d9a2c5a6dca7c208c",
        response_type: "code",
        redirect_uri: "https://mmnos.github.io/Project1/",
        q: "rihanna",
        limit: 3
    }

    // converts the query param object to a string for the url
    let queryParamString = $.param(queryParam);
    console.log(queryParamString);

    // var that holds the complete url with custom search results
    let completeSpotifyURL = spotifyURL + queryParamString;
    console.log(completeSpotifyURL);

    // makes an AJAX request to get data from spotify
    $.get({
        url: completeSpotifyURL
    }).then(updatePage);

    // updates the page with new playlists 
    let updatePage = function (response) {

        let $artist = $("<p>");
        let $song = $("<p>");

        $(".test").append($artist);
        $(".test").append($song);

    }

});