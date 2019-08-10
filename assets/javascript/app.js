let spotifyURL = "https://accounts.spotify.com/authorize?";

// grabs the zipcode from user
// let $search = $("#").val();

$(document).ready(function() {

    // builds query params
    let queryParam = {
        client_id : "ff7637f2ebb2489d9a2c5a6dca7c208c",
        response_type : "code",
        redirect_uri : "https://mmnos.github.io/Project1/",
        q : "rihanna",
        limit : 3
    }

    // converts the query param object to a string for the url
    let queryParamString = $.param(queryParam);
    console.log(queryParamString);

    // var that holds the complete url with custom search results
    let completeSpotifyURL = spotifyURL + queryParamString;
    console.log(completeSpotifyURL);

    // makes an AJAX request to get data from spotify
    $.get({
        url : completeSpotifyURL
    }).then(updatePage);

    // updates the page with new playlists 
    let updatePage = function (response) {

        let $artist = $("<p>");
        let $song = $("<p>");

        $(".test").append($artist);
        $(".test").append($song);

    }

});