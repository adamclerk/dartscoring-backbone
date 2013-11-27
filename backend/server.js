#!/usr/bin/env node

var express = require('express');
var backboneio = require('backbone.io');

var games = {
	110:{
		options: {},
		players: [],
		dartsThrown: []
	}
};
var app = express();
app.use(express.static(__dirname + "/.."));
app.use(express.bodyParser());

app.get('/data/games', function(req, res){
	res.send(games);
});
app.post('/data/games', function(req, res){

})

app.get('/data/games/:id', function(req, res){
	if(games[req.params.id]){
		res.send(games[req.params.id])
	} else {
		res.status(404).send({});
	}
});

var http = require('http');
var server = http.createServer(app);
server.listen(8000);
console.log('http://localhost:8000/');

var backend = backboneio.createBackend();

/*backend.use(function(req, res, next) {
  console.log(req.backend);
  console.log(req.method);
  console.log(JSON.stringify(req.model));
  next();
});
*/

backend.read(function(req, res) {
	if(games[req.channel]){
		res.end(games[req.channel]);
	} else {
		games
	}
	res.end({});
});

backend.use(backboneio.middleware.memoryStore());

backboneio.listen(server, { dartbackend	: backend });