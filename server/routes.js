
var redirect = require('./main');
module.exports = function(app) {
app.get('/', function(req, res) {
	res.sendFile('index.html');
});





app.get('/:id', function(req, res) {

	var url = req.params.id;
	console.log(url);
	redirect.findUrl(url, function(err, result) {
		if(err) return res.status(500).end(err);
		if(!result) return res.status(500).end('No such link');
		return res.redirect(result);
	});

	

});


app.post('/', function(req, res) {
	
	var url = req.body.url;
	if(!url) return res.status(500).end("No url");

	var shortUrl = redirect.generate();

	redirect.store(url, shortUrl, function(err) {
		if(err) return res.status(500).end('Unable to store url, please try again.');
		res.status(200).jsonp({url: url, shortUrl: 'http://localhost:3000/'+shortUrl});
	});


	
});


app.get('/:id/stats', function(req, res) {
	var url = req.params.id;
	res.status(200).end(url);
});



}