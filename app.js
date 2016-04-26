'use strict';

var ytSearch = require('./lib/services');
var countries = require('./json/countries.json');
var db = require('mongoskin').db('mongodb://localhost:27017/youtube', {safe: true});
var async = require('async');

function saveYoutubeToMongo(name, callback){
	ytSearch.addSearchParams(name.code);
	ytSearch.getVideo(function(err, res, body){
		
		if(err){
			callback(err);
		} 
		else {
			body.country = name.code;
			db.collection('vids').insert(body, function(e, success) {
			    if (e) callback(e); 
			    if (success){ 
			    	console.log(name.name +' added!');
			    	callback();
				}
			});

		}
	});
}
function updateDB(){
	async.each(countries, saveYoutubeToMongo, function (error) {
	  if(error) {
	    throw error;
	  } else {
	  	console.log('Finished!');
	  }
	});
}

db.collection('vids').remove({}, function(e, success) {
    if (e){
    	throw e;
    } 
    else	
    {
    	console.log('Removed all!');
    	updateDB();
    }
});
    


//Todo:
//1. get all video list ... done
//2. load video list based on country ... done
//3. create country list ... done
//4. save to mongodb ... done
//5. add mongodb test
//6. Add log file
//7. build scheduler


