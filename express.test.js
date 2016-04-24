'use strict';

var superagent = require('superagent')
var expect = require('expect.js')
var result = require('./lib/services');

describe('services.js', function(){
  
  
  it('should return video list', function(done){
    result.getVideo(function(err, res, body){
      expect(err).to.eql(null);
      expect(body).to.be.an('object');
      done();
    });
  });

  
});


