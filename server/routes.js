var config = require('./config/config');
var redirect = require('./main');
var url = require('url');
module.exports = function(app, home) {




app.post('/api/redirect', function(req, res) {
	
	var url = req.body.url;
	console.log(url);
	redirect.findUrl(url, function(err, result) {
		console.log(err);
		console.log(result);
		if(err) return res.status(500).end(err);
		if(!result) return res.status(500).end('No such link');
		return res.status(200).end(result);
	});

	

});


app.post('/api/new', function(req, res) {
	
	var host = req.body.url;
	if(!host) return res.status(500).end("No url");
	if(!host.match('http')) host = 'http://'+host;
	url = url.parse(host);
	
	
	if(!url.hostname || host.indexOf('.') === -1) return res.status(500).end('Invalid url');

	var shortUrl = redirect.generate();

	redirect.store(host, shortUrl, function(err) {
		if(err) return res.status(500).end('Unable to store url, please try again.');
		res.status(200).jsonp({url: url, shortUrl: config.server+shortUrl});
	});


	
});



app.post('/api/stats', function(req, res) {
	var url = req.body.url;
	
	redirect.getUrl(url, function(err, result) {
		
		if(err) return res.status(500).end(err);
		if(!result) return res.status(500).end('No such URL');
		return res.status(200).jsonp({stats: result});
	});
});



}