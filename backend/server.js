#!/usr/bin/env node

var express = require('express');

var games = {
	"001":{
		options: {
			game: "101",
			name: "301",
			winning_score: 301
		},
		players: [],
		dartsThrown: []
	}
};
var app = express();
app.use(express.static(__dirname + "/.."));
app.use(express.urlencoded())
app.use(express.json())

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
var io = require('socket.io').listen(server);

server.listen(8000);
console.log('http://localhost:8000/');

io.sockets.on('connection', function (socket) {
  socket.on('throwDart', function (dart) {
  	socket.broadcast.emit('dartThrown', dart);
  });
});