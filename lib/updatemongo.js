'use strict';

var ytSearch = require('./services');
var countries = require('../json/countries.json');
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
winston.remove(winston.transports.Console);
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
var updateDB = function(callback){
	async.each(countries, saveYoutubeToMongo, function(error){
	  callback(error);
	});
}

var clearDB = function(callback){
	db.collection('vids').remove({}, function(e, success){
		callback(e, success);
	});
}

module.exports = {
	clearDB: clearDB,
	updateDB: updateDB,
	winston: winston
};
