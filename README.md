bleed
=====

Node.js module to consume memory in a configurable and predictable way.

# Usage

```
$ npm install bleed
```

```js
var bleed = require('bleed');

bleed(options, callback);
```

`options.bytes` {Number} The number of bytes to allocate.
`options.time` {Number} The amount of time, in milliseconds, to take to allocate the memory.
`options.increments` {Number} The number of allocations to perform. The timespan will be divided into even increments and one allocation will occur per increment.
`options.debug` {Boolean} Whether or not to print debug messages to console when running.
`callback` {Function} Called when done. Includes the buffers that were allocated.

# Examples

```js
// Bleed 1 gigabyte of memory over 60 seconds. One allocation per second.
var options = {
  bytes = bleed.ONE_GIGABYTE;
  time = 60000;
  increments = 60;
};

bleed(options, function(err, buffers) { console.log('DONE!') });
```

```js
// Bleed 50 megabytes of memory.
var options = {
  bytes = bleed.ONE_MEGABYTE * 50;
};

bleed(options, function(err, buffers) { console.log('DONE!') });
```

```js
// Bleed 2 gigabytes of data over 30 seconds. One allocation very 2 seconds.
var options = {
  bytes = 2 * bleed.ONE_GIGABYTE;
  time = 30000;
  increments = 15;
};

bleed(options, function(err, buffers) { console.log('DONE!') });

```
