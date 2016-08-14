var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

/*
app.use(function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
*/
app.get('/', function(req, res) {
	res.sendFile('index.html');
});
require('./server/routes')(app,__dirname);


app.listen(3000);