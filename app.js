'use strict';

var request = require('request-json');
var client = request.createClient('https://www.googleapis.com/');
 
 
client.get('youtube/v3/search?part=snippet&order=viewCount&key=AIzaSyCl3iyhmnx5ZUPKoVoDSJWNyJEdZi1jNR4&type=video&maxResults=48&q=', function(err, res, body) {
  return console.log(body);
});

