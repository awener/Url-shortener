var mongoose = require('mongoose');

module.exports = mongoose.model('Links', {
	real_url : String,
	short_url : String,
	views : {
		type: Number,
		default: 0
	}
	
});