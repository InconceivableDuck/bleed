var async = require('async');

/**
 * Consumes memory over time.
 * @param {Number} options.bytes The amount of memory to consume, in byts.
 * @param {Number} options.time The number of milliseconds over which to consume memory.
 * @param {Number} options.increments The number of allocations that will occur.
 * @param {Function} callback Callback handling the response.
 */
module.exports = function(options, callback) {

  options = options || {};
  options.bytes = options.bytes || 1;
  options.time = options.time || 1;
  options.increments = options.increments || 1;
  options.debug = options.debug || false;

  var buffers = [];

  var increments = options.increments;
  var incrementAmount = Math.floor(options.bytes / increments);
  var incrementTime = Math.floor(options.time / increments);
  var count = 0;

  async.whilst(
    function() { return count < increments; },
    function(callback) {
      count++;
      setTimeout(allocate, incrementTime, options, count, incrementAmount, buffers, callback);
    },
    function() { callback(null, buffers); });
};

/**
 * Allocates a buffer to the specified size.
 * @param {Number} bytes The number of bytes to allocate.
 */
var allocate = function(options, increment, bytes, buffers, callback) {

  if(options.debug) {
    console.log('Increment ' + increment + ' allocating ' + bytes + ' bytes.');
  }

  var buffer = new Buffer(bytes);
  buffer.fill('h');
  buffers.push(buffer);

  callback();
};

// Helpers when specifying amount to bleed(),
module.exports.ONE_KILOBYTE = 1024;
module.exports.ONE_MEGABYTE = module.exports.ONE_KILOBYTE * 1024;
module.exports.ONE_GIGABYTE = module.exports.ONE_MEGABYTE * 1024;