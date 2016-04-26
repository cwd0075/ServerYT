'use strict';

var ytSearch = require('./lib/services');
var countries = require('./json/countries.json');
var db = require('mongoskin').db('mongodb://localhost:27017/youtube', {safe: true});
var async = require('async');
var winston = require('winston');

winston.add(
  winston.transports.File, {
    filename: 'ServerYTWinston.log',
    level: 'info',
    json: true,
    timestamp: true
  }
);

winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
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
			    	winston.info(name.name +' record added!');
			    	callback();
				}
			});

		}
	});
}
function updateDB(){
	async.each(countries, saveYoutubeToMongo, function (error) {
	  if(error) {
	    winston.error(error);
	  } else {
	  	winston.info('Finished all countries update');
	  }
	});
}



db.collection('vids').remove({}, function(e, success) {
    if (e){
    	winston.error(e);
    } 
    else	
    {
    	winston.info('Removed all old database records');
    	updateDB();
    }
});
    


//Todo:
//1. get all video list ... done
//2. load video list based on country ... done
//3. create country list ... done
//4. save to mongodb ... done
//5. add mongodb test ... done
//6. Add log file ... done
//7. build scheduler


