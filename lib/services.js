'use strict';

var request = require('request-json');
var client = request.createClient('https://www.googleapis.com/');

var yt = { 
		getVideo: function(callback){
			client.get('youtube/v3/search?part=snippet&order=viewCount&key=AIzaSyCl3iyhmnx5ZUPKoVoDSJWNyJEdZi1jNR4&type=video&maxResults=48&q=', function(err, res, body) {
  				if(err) {return callback(err, null, null);}
  				if(res.statusCode == 400) {return callback(400, res, body)};
  				return callback(err, res, body);
			});	
		}
		

}

module.exports = yt;