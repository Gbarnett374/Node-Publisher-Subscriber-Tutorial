'use strict';

var redis  = require('redis');
var client = redis.createClient();

// Handle Redis Errors.
client.on('error', function(err){
	throw err;
});

module.exports = client;