'use strict';

var superagent = require('superagent');
var expect = require('expect.js');
var result = require('./lib/services');
var countries = require('./json/countries.json');
var db = require('mongoskin').db('mongodb://localhost:27017/youtube', {safe: true});

describe('countries.json',function(){
  it('should return Worldwide country code',function(){
    var test = '';
    for (var i = 0; i < countries.length; i++) {
      if (countries[i].name =='Worldwide')
      {
        test = countries[i].code;
        break;
      }
    }
    expect(test).to.eql('US');
  });

});

describe('services.js', function(){
    
  it('should return hk video list', function(done){
    result.addSearchParams('HK');
    result.getVideo(function(err, res, body){
      expect(err).to.eql(null);
      expect(body).to.be.an('object');
      done();
    });
  });
});

describe('Mongoskin', function(){
  it('should clear the database', function(done){
    db.collection('vids').remove({}, function(e, success) {
        db.collection('vids').count(function(err, count){
            expect(count).to.eql(0);
            done();
        });
    });
  });
  it('should insert record to database', function(done){
    db.collection('vids').insert({a: 1}, function(e, success) {
        db.collection('vids').count({a: 1}, function(err, count){
            expect(count).to.eql(1);
            done();
        });
    });
  });
});
