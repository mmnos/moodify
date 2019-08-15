$(document).ready(function () {

  // weather variables
  let userZip,
    weatherData,
    cityName,
    temp,
    weather,
    weatherIcon,
    search,
    playlists,
    icon

  let coldPlaylists = ["Winter Chills", "Winter Acoustics", "Winter Chill Deep House"],
      sunnyPlaylists = ["Happy Hits!", "Happy Tunes", "Happy Drive"],
      chillPlaylists = ["Chill Hits", "Mellow Classics", "Summer Chill"]


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

      let weatherId = parseInt(weatherData.weather[0].id);
      console.log(weatherId);

      let weatherSearch = () => {

        switch (true) {

          case (weatherId < 233): 
            search = "rain";
            icon = "t-storms";
            break;

          case (weatherId < 550):
            search = "rain";
            icon = "rain";
            break;

          case (weatherId < 623):
            search = "winterchill";
            icon = "snowy";
            break;

          case (weatherId < 782):
            search = "chill";
            icon = "cloudy";
            break;

          case (weatherId < 804):
            search = "happy";
            icon = "sunny";
            break;

          case (weatherId === 804):
            search = "chill";
            icon = "cloudy";
            break;

          default:
            search = "chill";
            break;

        };

        searchForPlaylist();
      }

      $("#weather-data").show();
      weatherSearch();

    });
  }

  // let coldPlaylist = () => {

  //   playlists.foreach(el => {

  //     if (el.name === "Winter Chill Deep House") {
        
  //     } else if (el.name === "Winter Chills") {

  //     } else if (el.name === "Winter Acoustics") {

  //     }

  //   })

  // }

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
    $("#weather-data").hide();

  });

  // press enter key to submit zipcode
  $(document).on("keypress", function (event) {

    if (event.key === "Enter") {

      checkZip();

    }

  });

  let appendPlaylists = (playlists) => {

    for (i = 0; i < 3; i++) {
  
      // let playlistName = playlists[i].name;
      let imgSrc = playlists[i].images[0].url;
      let redirect = playlists[i].external_urls.spotify;
  
      // let $name = $("<h4>").text(playlistName);
  
      let $img = $("<img>")
        .attr("src", imgSrc)
        .css({
          "cursor": "pointer",
          "width" : "80%"
      });
  
      let $a = $("<a>")
        .attr("href", `${redirect}`)
        .attr("target", "_blank")
        .append($img);
  
      $(`div#${i}`).append($a);
  
    }

  }

  // var to hold access token
  let accessToken = "BQBoLSS1nIrn5oUiCfRSjzXv6uoY_Dgi255AURpMIf-u0RUf2SXA1lfwU1vwp3rLC2oJgTqvh0t-8Ig0G0BmNN2oruvGMF4L-36_n_nlv5kBqpdN9TUAa4Bq6gGi5F9dUqkLohF-EqJ2eptqEDZSSv0lIsm5eqT05kxCHjhWCEMqxMPMTD9KagR4u_r-dRlV_VKC99EU7Ml6brU-awewQEO6F7TZwanV75zofN3ZoQ";

  let searchForPlaylist = function () {

    // makes an ajax request to search the spotify api with recommended playlists
    $.get({

      url: `https://api.spotify.com/v1/search?q=${search}&type=playlist&limit=3`,
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      success: function (response) {

        console.log(response);

        playlists = response.playlists.items;

        console.log(playlists);

        appendPlaylists(playlists)


      }

    });

  }

});