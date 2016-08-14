var storage = require('./models/links');
var config = require('./config/config');
exports.generate = function() {

	// generate pseudo-random string with length 7
	return Math.random().toString(36).slice(-7);
	
}

exports.store = function(url, shorturl, callback) {
	
	var newLink = new storage({
		real_url: url,
		short_url: shorturl

	});

	newLink.save(function(err) {
		return callback(err);
	});
	
}

exports.findUrl = function(url, callback) {
	storage.findOne({short_url: url}, function(err, result) {
		if(err) return callback(err, null);
		if(!result) return callback(null, null);
		result.views += 1;
		result.save(function(err) {
			return callback(null, result.real_url);
		});
		
	});
}

exports.getUrl = function(link, callback) {
	storage.findOne({short_url: link}, function(err, result) {
		if(err) return callback(err, null);
		if(!result) return callback(null, null);
		result.short_url = config.server+result.short_url;
		return callback(null, result);
	});
}

