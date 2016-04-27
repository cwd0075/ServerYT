'use strict';

var updatemongo = require('./lib/updatemongo');
var CronJob = require('cron').CronJob;

function mainRun(){
    updatemongo.clearDB(function(e, success) {
        if (e){
        	updatemongo.winston.error(e);
        } 
        else	
        {
        	updatemongo.winston.info('Removed all old database records');
        	updatemongo.updateDB(function(error){
        		if(error) {
    			    updatemongo.winston.error(error);
    			  } else {
    			  	updatemongo.winston.info('Finished all countries update');
    			  }
        	});
        }
    });
    
}

var job = new CronJob('00 30 * * * *', function() {
        mainRun();
    }, 
null, false, 'Asia/Hong_Kong');

job.start();

//command to run in background: "nohup node app.js &"

//Todo:
//1. get all video list ... done
//2. load video list based on country ... done
//3. create country list ... done
//4. save to mongodb ... done
//5. add mongodb test ... done
//6. Add log file ... done
//7. build scheduler ... done


