'use strict';

var request = require('request-json');
var client = request.createClient('https://www.googleapis.com/');
var baseUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+statistics&chart=mostPopular&maxResults=48&key=AIzaSyCl3iyhmnx5ZUPKoVoDSJWNyJEdZi1jNR4';
var fieldsParam = 'items/statistics,items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/high';
var yt = { 

	searchUrl: '',
	addSearchParams: function(params){
		var attrs = '&regionCode='+params;
		this.searchUrl = baseUrl+'&fields='+fieldsParam+attrs;
	},
	getVideo: function(callback){
		if (this.searchUrl==''){return callback('no search params', null, null)}; 
		//console.log(this.searchUrl);
		client.get(this.searchUrl, function(err, res, body) {
				if(err) {return callback(err, null, null);}
				if(res.statusCode == 400) {return callback(400, res, body)};
				return callback(err, res, body);
		});	
	}
		

}

module.exports = yt;