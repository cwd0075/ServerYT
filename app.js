'use strict';

var result = require('./lib/services');
result.getVideo(function(err, res, body){
	if(err) {throw err;}
	else {console.log(body);}

});



