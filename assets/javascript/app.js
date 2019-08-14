$(document).ready(function () {

    // weather variables
    let userZip,
        weatherData,
        cityName,
        temp,
        weather,
        weatherIcon,
        search

    $("#weather-data").hide();
    $(".helper-text").hide();
    $("#zipcode").focus();

    let getWeather = function () {

        // queryURL = `api.openweathermap.org/data/2.5/weather?zip=${userZip}&APPID=01b094dd158ecf4fb77c7c5db98a6ad6`
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?zip=${userZip}&APPID=01b094dd158ecf4fb77c7c5db98a6ad6`

        $.get(queryURL).then(function (response) {

            weatherData = response;

            console.log(weatherData);

            // display location
            cityName = weatherData.name;
            let cityP = $("<span>").text(cityName).addClass("updatedWeather");

            // declares weather icon
            weatherIcon = weatherData.weather[0].icon;
            let iconURL = `http://openweathermap.org/img/w/${weatherIcon}.png`;
            let wIcon = $("<img>").attr('src', iconURL).addClass("weatherPic");

            // display weather
            weather = weatherData.weather[0].description;
            let weatherP = $("<span>").text(weather + " in ").addClass("updatedWeather");
            $("div#weather-text").append(weatherP, cityP);

            // display weather icon + temperature
            temp = (parseInt(weatherData.main.temp) - 273.15) * 9 / 5 + 32;
            temp = Math.round(temp);
            let tempP = $("<span>").text(temp + "°").addClass("updatedWeather").css("font-size", "50px");
            $("div#temperature").prepend(tempP.prepend(wIcon));

            if (weatherIcon === "01d" || weatherIcon === "01n") {
                search = "happy";
                searchForPlaylist();
            } else if (weatherIcon === "02d" || weatherIcon === "02n") {
                search = "chill";
                searchForPlaylist();
            } else if (weatherIcon === "03d" || weatherIcon === "03n") {
                search = "chill";
                searchForPlaylist();
            } else if (weatherIcon === "04d" || weatherIcon === "04n") {
                search = "chill";
                searchForPlaylist();
            } else if (weatherIcon === "09d" || weatherIcon === "09n") {
                search = "rainy";
                searchForPlaylist();
            } else if (weatherIcon === "10d" || weatherIcon === "10n") {
                search = "rainy";
                searchForPlaylist();
            } else if (weatherIcon === "11d" || weatherIcon === "11n") {
                search = "rainy";
                searchForPlaylist();
            } else if (weatherIcon === "13d" || weatherIcon === "13n") {
                search = "rainy";
                searchForPlaylist();
            } else {
                search = "focus";
                searchForPlaylist();
            }

        });

        $("#weather-data").show();

    };

    let checkZip = function () {

        $(".updatedWeather").empty();

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
            $(".helper-text").hide();
            $(".input-field").hide();

        } else {

            $(".helper-text").show();

        }

        // clears input field after clicking search
        $("#zipcode").val('');

    }

    // checks zipcode after clicking search button
    $("#submitZip").on("click", function (event) {

        checkZip();

    });

    // shows input field and hides weather data
    $("#changeZip").on("click", function (event) {

        $(".item").empty();
        $(".input-field").show();
        $("#zipcode").focus();
        $("#weather-data").hide();

    });

    // press enter key to submit zipcode
    $(document).on("keypress", function (event) {

        if (event.key === "Enter") {

            checkZip();

        }

    });

    // var to hold access token
    let accessToken = "BQAmY_ojhEICImf5X2AwFAmBb2s_3I2R_6HWEH_1xhRVXf4CysyjuyAyP1xmmlxUpTyuUMpQ8mLRxOvxUnKhdBZA8TnEf5ZdfQ_R0Fhg4kOY0i6nlGaAfZ-mY81zvJmFYNI4_bzL14nO5XZKusrlZA8BhfCrrwV3ppvK3FfcIGZjiBp9jug1ov52m3uETKy8MvmBjHBir3u7";

    let searchForPlaylist = function () {

        // makes an ajax request to search the spotify api with recommended playlists
        $.get({

            url: `https://api.spotify.com/v1/search?q=${search}&type=playlist&limit=5`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (response) {

                console.log(response);

                let playlists = response.playlists.items

                console.log(playlists);

                for (i = 0; i < playlists.length; i++) {

                    // let playlistName = playlists[i].name;
                    let imgSrc = playlists[i].images[0].url;
                    let redirect = playlists[i].external_urls.spotify;

                    // let $name = $("<h4>").text(playlistName);

                    let $img = $("<img>")
                        .attr("src", imgSrc)
                        .css("cursor", "pointer");

                    let $a = $("<a>")
                        .attr("href", `${redirect}`)
                        .attr("target", "_blank")
                        .append($img);

                    $(`div#${i}`).append($a);

                }

            }

        });

    }

});