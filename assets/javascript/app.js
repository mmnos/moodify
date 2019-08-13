$(document).ready(function () {

    // weather variables
    let userZip,
        weatherData,
        cityName,
        temp,
        weather

    $("#weather-data").hide();
    $(".helper-text").hide();

    let getWeather = function () {

        // queryURL = `api.openweathermap.org/data/2.5/weather?zip=${userZip}&APPID=01b094dd158ecf4fb77c7c5db98a6ad6`
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?zip=${userZip}&APPID=01b094dd158ecf4fb77c7c5db98a6ad6`

        $.get(queryURL).then(function (response) {

            weatherData = response;

            console.log(weatherData);

            // display location
            cityName = weatherData.name;
            let cityP = $("<span>").text(cityName).addClass("updatedWeather");

            // display weather
            weather = weatherData.weather[0].description;
            let weatherP = $("<span>").text(weather + " in ").addClass("updatedWeather");
            $("div#weather-text").append(weatherP, cityP);

            // display temperature
            temp = (parseInt(weatherData.main.temp) - 273.15) * 9 / 5 + 32;
            temp = Math.round(temp);
            let tempP = $("<span>").text(temp + "°").addClass("updatedWeather").css("font-size", "50px");
            $("div#temperature").prepend(tempP);

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

        // clears input field after clicking submit
        $("#zipcode").val('');

    }

    // checks zipcode after clicking submit button
    $("#submitZip").on("click", function (event) {

        checkZip();

    });

    // shows input field and hides weather data
    $("#changeZip").on("click", function (event) {

        $(".input-field").show();
        $("#weather-data").hide();

    });

    // press enter key to submit zipcode
    $(document).on("keypress", function (ent) {

        if (ent.which === 13) {

            checkZip();

        }

    });

    // var to hold access token
    let accessToken = "BQAn1gI37gBIHteXExbd1AuLXUPveg1va-_u6Ddw4Gwf-t3fzwx3P52j9xOKKfVh917uzFZB9FSWEhxZ2PqT2xsVTsmfy2AZAI4my2fmL46xJA-dSf-dZXMHx2WJpQ1hxZUDLT9JbG9xXoWMf1Ik38OHN-JoC8DaOY6mNehAkKBsxqJXPk5W8pStH98duQnl1B6X9EaQkS3n";

    // makes an ajax request to search the spotify api with recommended playlists
    $.get({

        url: 'https://api.spotify.com/v1/search?q=rainy&type=playlist&limit=5',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {

            console.log(response);
            let playlists = response.playlists.items

            console.log(playlists);


            for (i = 0; i < playlists.length; i++) {

                let playlistName = playlists[i].name;
                let imgSrc = playlists[i].images[0].url;
                let redirect = playlists[i].external_urls.spotify;

                let $name = $("<h4>").text(playlistName);

                let $img = $("<img>")
                    .attr("src", imgSrc)
                    .css("cursor", "pointer");

                let $a = $("<a>")
                    .attr("href", `${redirect}`)
                    .append($img);

                $(`div#${i}`).append($name, $a);

            }

        }

    });

});