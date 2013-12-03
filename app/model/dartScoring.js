define([
	'underscore',
	'backbone',
	'model/player',
	'model/dartThrow',
	'event/dartEvents',

],
function (_, Backbone, Player, DartThrow, dartEvents) {
	var DartScoringModel = Backbone.Model.extend({
		url: function () { return '/data/games/' + this.id; },
		constructor: function (options) {
			if (!options.id) {
				options.id = parseInt(Math.random() * 10000, 10);
			}

			this.id = options.id;
			console.log(this.id);
			dartEvents.join(this.id);

			Backbone.Model.apply(this, arguments);
		},
		initialize: function () {
			_.bindAll(this, 'addDart');
			this.listenTo(dartEvents, 'dartThrown', this.addDart);
		},
		parse: function (response) {
			var Game = require('game/' + response.options.game);
			this.game = new Game();
			this.game.start(response.players, response.options, response.dartsThrown);
			return response;
		},
		toJSON: function () {
			return {options: this.game.options, info: this.game.info()};
		},
		addDart: function (dart) {
			this.game.throwDart(dart);
			this.trigger('change');
		},
		throwDart: function (dart) {
			if (!dart) {
				return;
			}
			this.addDart(dart);
			var payload = {dart: dart, gameid: this.id};
			dartEvents.emit('throwDart', payload);
		}

	});
	
	return DartScoringModel;
});