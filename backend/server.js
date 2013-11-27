#!/usr/bin/env node

var express = require('express');
var backboneio = require('backbone.io');

var app = express();
app.use(express.static(__dirname + "/.."));

app.get('/data/game', function(req, res){
	res.status(404).send({});
})

app.get('/data/game/:id', function(req, res){
	res.send({id: req.params.id});
})

var http = require('http');
var server = http.createServer(app);
server.listen(8000);
console.log('http://localhost:8000/');

var backend = backboneio.createBackend();

backend.use(function(req, res, next) {
  console.log(req.backend);
  console.log(req.method);
  console.log(JSON.stringify(req.model));
  next();
});

backend.use(backboneio.middleware.memoryStore());

backboneio.listen(server, { mybackend: backend });