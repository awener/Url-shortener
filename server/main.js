var storage = require('./models/links');

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
		return callback(null, result.real_url);
	});
}