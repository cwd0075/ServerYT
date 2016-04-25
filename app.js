'use strict';

var ytSearch = require('./lib/services');
var countries = require('./json/countries.json');
var db = require('mongoskin').db('mongodb://localhost:27017/youtube');
var async = require('async');

function getInfo(name, callback){
	ytSearch.addSearchParams(name.code);
	ytSearch.getVideo(function(err, res, body){
		
		if(err){
			callback(err, null);
		} 
		else {
			body.country = name.code;
			callback(null, body);
		}
	});

}

async.map(countries, getInfo, function (error, result) {
  if(error) {
    throw error;
  } else {
  	console.log(result);
  	db.collection('vids').insert(result, function(e, success) {
			    if (e) throw e;
			    if (success) console.log('Added!');
			    db.close();

			});
    
  }

});

    


//Todo:
//1. get all video list ... done
//2. load video list based on country ... done
//3. create country list ... done
//4. save to mongodb ... done
//5. add mongodb test, solve the array issue, check putting db.close() in e and success
//6. build scheduler


