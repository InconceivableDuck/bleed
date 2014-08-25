var bleed = require('../index'),
    should = require('should');

var debug = false;

describe('bleed', function() {

  it('should create same number of buffers as increments', function(done) {
    
    bleed({ bytes: bleed.ONE_MEGABYTE, time: 100, increments: 10, debug: debug }, function(err, buffers) {
      buffers.length.should.equal(10);
      done();
    });

  });

  it('buffers should be the correct size', function(done) {

    bleed({ bytes: 10 * bleed.ONE_MEGABYTE, time: 100, increments: 10, debug: debug }, function(err, buffers) {
      buffers.forEach(function(buffer) {
        buffer.length.should.equal(Math.floor(10 * bleed.ONE_MEGABYTE / 10));
      });

      done();
    });

  });

});