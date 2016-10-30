'use strict';

var redis = require('../lib/redis');
var broadcast = require('../lib/broadcast');

/**
 * Save badges to database. 
 * @param  {Array}   badges
 * @param  {Function} callback 
 */
exports.save = function(badges, callback) {
	if (!badges.length) return callback(null, null)
	// Pop first badge off array & Insert to list.
	var badge = badges.pop();
	redis.lpush('badges', JSON.stringify(badge), function(err){
		if (err) return callback(err, null);
		exports.save(badges, callback);
	});
};

/**
 * Trim the redis list.
 */
exports.trim = function() {
	redis.ltrim('badges', 0, 9);
};

/**
 * Sends out badges to the broadcaster.
 * @param {Array} badges
 * @param {Function} callback
 */
exports.send = function(badges, callback) {
	badges.forEach(broadcast.send);
	/*Instead of this:
	badges.forEach(function(badge){
		broadcast.send(badge);
	});
	*/
	callback(null, null);
};

/**
 * Get Badges from redis;
 * @param {Function} callback
 */
exports.get = function(callback){
	redis.lrange('badges', 0, -1, function(err, data){
		if (err) return callback(err, null);
		data = data.map(JSON.parse);
		callback(null, data);
	});

};