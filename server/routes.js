var config = require('./config/config');
var redirect = require('./main');
var url = require('url');
module.exports = function(app, home) {




app.get('/:id', function(req, res) {
	
	var url = req.params.id;
	
	redirect.findUrl(url, function(err, result) {
		if(err) return res.status(500).end(err);
		if(!result) return res.status(500).end('No such link');
		return res.redirect(result);
	});

	

});


app.post('/', function(req, res) {
	
	var host = req.body.url;
	if(!host) return res.status(500).end("No url");
	if(!host.match('http')) host = 'http://'+host;
	url = url.parse(host);
	if(!url.hostname) return res.status(500).end('Invalid url');

	var shortUrl = redirect.generate();

	redirect.store(url.hostname, shortUrl, function(err) {
		if(err) return res.status(500).end('Unable to store url, please try again.');
		res.status(200).jsonp({url: url, shortUrl: config.server+shortUrl});
	});


	
});

app.get('/:id/stats', function(req, res) {
	res.sendFile(home+'/public/stats.html');
});

app.post('/api/:id/stats', function(req, res) {
	var url = req.body.url;
	
	redirect.getUrl(url, function(err, result) {
		
		if(err) return res.status(500).end(err);
		if(!result) return res.status(500).end('No such URL');
		return res.status(200).jsonp({stats: result});
	});
});



}