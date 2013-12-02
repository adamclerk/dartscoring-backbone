#!/usr/bin/env node

var express = require('express');

var games = {
	"001":{
		options: {
			game: "301",
			name: "301",
			winningScore: 301,
			dartsPerTurn: 3
		},
		players: ['bill', 'ted'],
		dartsThrown: []
	}
};
var app = express();
app.use(express.static(__dirname + "/.."));
app.use(express.urlencoded());
app.use(express.json());

app.get('/data/games', function(req, res){
	res.send(games);
});

app.get('/data/games/:id', function(req, res){
	if(games[req.params.id]){
		res.send(games[req.params.id]);
	} else {
		res.status(404).send({});
	}
});

app.post('/data/games', function(req, res){
	var game = JSON.parse(req.body.data);
	var id = game.id;
	delete game.id;
	games[id] = game;
	res.redirect(201, '/data/games/' + id);
});

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.set('log level', 1);

server.listen(8000);
console.log('http://localhost:8000/');

io.sockets.on('connection', function (socket) {
	socket.on('joingame', function(gameid){
		console.log('joining game', gameid);
		socket.join(gameid);
	});
	socket.on('throwDart', function (payload) {
		var dart = payload.dart;
		var gameid = payload.gameid;
		if(games[gameid]){
			games[gameid].dartsThrown.push(dart);
			console.log('sending dart to', gameid);
			socket.broadcast.to(gameid).emit('dartThrown', dart);
		} else {
			console.log('game not found');
		}
	});
});