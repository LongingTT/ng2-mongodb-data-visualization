var express = require('express');
var path = require('path');

// create express service
var app=express();

app.use('/scripts', express.static(__dirname+'/../client/scripts'));
app.use('/css', express.static(__dirname+'/../client/css'));
app.use('/views', express.static(__dirname+'/../client/views'));

app.get('/', function(req, res) {
	res.redirect('/index');
});
app.get('/index', function(req, res) {
	res.sendFile(path.resolve('../client/views/index.html'));
});
var logErrors = function(err, req, res, next) {
	console.log(err);
  	console.error(err.stack);
  	next(err);
}
app.use(logErrors);

app.listen(3000,function(){console.log('Example app listening on port 3000')}); 

