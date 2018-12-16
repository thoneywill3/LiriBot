//require("dotenv").config();

//-------------------VARIABLES----------------------------------------------------
require("dotenv").config();
var moment = require("moment");
//Loading modules
//var Twitter = require('twitter');
//var spotify = require('spotify');
//var request = require('request');
//var fs = require('fs');
var keys = require("./keys.js");
//var tweetsArray = [];
var command = process.argv[2];
var commandParam = process.argv[3];
var defaultMovie = "Ex Machina";
var defaultSong = "Radioactive";

//var twitterKeys = keys.twitterKeys;
/*
var tmdbKey = keys.tmdbKey;

var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});
*/

console.log(command);
console.log(commandParam);
processCommands(command, commandParam);

//-----------------------FUNCTIONS-----------------------------------------------

//This function processes the input commands
function processCommands(command, commandParam){

	switch(command){

	case 'concert-this':
		concertThis(commandParam); break;
	case 'spotify-this-song':
		//If user has not specified a song , use default
		if(commandParam === undefined){
			commandParam = defaultSong;
		}     
		spotifyThis(commandParam); break;
	case 'movie-this':
		//If user has not specified a movie Name , use default
		if(commandParam === undefined){
			commandParam = defaultMovie;
		}    
		movieThis(commandParam); break;
	case 'do-what-it-says':
		doWhatItSays(); break;
	default: 
		console.log("Invalid command. Please type any of the following commnds: my-tweets spotify-this-song movie-this or do-what-it-says");
}

function concertThis(artist){
	var axios = require("axios");

	var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

	axios.get(URL).then(function(response) {
		// Place the response.data into a variable, jsonData.

		console.log(response.data[0].venue.name);
		console.log(response.data[0].venue.city);
		var momentvar = (response.data[0].datetime)
		var momentvar2 = moment(momentvar, moment.ISO_8601);
		console.log(momentvar2.format("MM/DD/YYYY"));
	})
}

function spotifyThis(song){

    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify(keys.spotify);

	//If user has not specified a song , default to "Radioactive" imagine dragons
	if(song === ""){
		song = "Radioactive";
	}

	spotify.search({ type: 'track', query: song}, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }

    var song = data.tracks.items[0];
    console.log("------Artists-----");
    for(i=0; i<song.artists.length; i++){
    	console.log(song.artists[i].name);
    }

    console.log("------Song Name-----");
    console.log(song.name);

	console.log("-------Preview Link-----");
    console.log(song.preview_url);

    console.log("-------Album-----");
    console.log(song.album.name);

	});

}

function movieThis(movie)
{
	var axios = require("axios");

	var URL = "https://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=de45c0f0";

	axios.get(URL).then(function(response) {

		console.log(response.data.Title);
		console.log(response.data.Year);
		console.log(response.data.imdbRating)
		console.log(response.data.Ratings)
		console.log(response.data.Country);
		console.log(response.data.Language);
		console.log(response.data.Plot);
		console.log(response.data.Actors);

	})
}

function doWhatItSays(){
	var fs = require('fs');
	fs.readFile('random.txt', 'utf8', function(err, data){

		if (err){ 
			return console.log(err);
		}

		var dataArr = data.split(',');

		processCommands(dataArr[0], dataArr[1]);
	});
}
}

