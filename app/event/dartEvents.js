define([
	'underscore',
	'backbone',
	'socket.io'
],
function (_, Backbone, io) {
	var dartEvents = _.extend({}, Backbone.Events);
	dartEvents.socket = io.connect('http://localhost:8000');

	dartEvents.socket.on('connect', function () {
		dartEvents.trigger('socket:connected');
	});

	dartEvents.socket.on('dartThrown', function (dart) {
		dartEvents.trigger('dartThrown', dart);
	});

	dartEvents.socket.on('disconnect', function () {
		dartEvents.trigger('socket:disconnected');
	});

	dartEvents.socket.on('error', function (err) {
		dartEvents.trigger('socket:error', err);
	});

	dartEvents.emit = function (ev, data) {
		dartEvents.socket.emit(ev, data);
	};

	dartEvents.join = function (gameid) {
		dartEvents.socket.emit('joingame', gameid);
	};

	return dartEvents;
});