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

    $("#submitZip").on("click", function(event) {

        userZip = $("#zipcode").val().trim();
        console.log(userZip);
        getWeather();

    });

    // var to hold access token
    let accessToken = "BQDus3jIgKsGevd_DUzETFOF_dqM_jN7_6-OMQRjg6U3rardIRBX-tLkverWChstGBbTKO3ZhLDfHQlny-qSZap3HnNELY6KCtTuTg8KmSzMgD4E7VmYUKsNDw4SzLZmTtfEQPsgyxIm332EzRtIzZ11FOZWHdm0c_ddH9pNudV-ieGpUUChg1QlBQaYm4HLVd7Avv6TCpca6Gk";

  // makes an ajax request to search the spotify api with recommended playlists
  $.get({

    url: 'https://api.spotify.com/v1/search?q=rainy&type=playlist&limit=5',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
    success: function (response) {

      console.log(response);
      let playlists = response.playlists.items

      console.log(playlists)


      for (i = 0; i < playlists.length; i++) {

        let playlistName = playlists[i].name;
        let imgSrc = playlists[i].images[0].url
        let redirect = playlists[i].external_urls.spotify

        let $name = $("<h4>").text(playlistName);

        let $img = $("<img>")
          .attr("src", imgSrc)
          .css("cursor", "pointer")

        let $a = $("<a>")
          .attr("href", `${redirect}`)
          .append($img)

        $(`div#${i}`).append($name, $a);

      }
    }

  });

});