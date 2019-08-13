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
  // let completeSpotifyURL = spotifyURL + queryParamString;
  // console.log(completeSpotifyURL);

  // var to hold access token
  let accessToken = "BQB3Eu4ZBp0o0XBB7cVkumZ1cjqJgnosuEfsiYBl_yB1VcaLFoEYpzuO81QNz_g6s_Oq8Ef5JP7ppHl2xHdscxNHRx6M8B8r8uRiHkgZkRJIQB5LRARFczoMqzrJMC1WdiYUl3HATv_8v-sOX-oyl4i0Ixnljx_4RbhqqWEyOKsGrPIXVSHkv5Wgr7Wee4ryDqNdO2im4h9_onc";

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