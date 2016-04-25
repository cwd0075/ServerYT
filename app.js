'use strict';

var result = require('./lib/services');
var countries = require('./json/countries.json');

for (var i = 0; i < countries.length; i++) {
	result.addSearchParams(countries[i].code);
	result.getVideo(function(err, res, body){
		if(err) {throw err;}
		else {
			
			console.log(body);
			}
	});    
    
}



//Todo:
//1. get all video list ... done
//2. load video list based on country ... done
//3. create country list ... done
//4. save to mongodb
//5. build scheduler


