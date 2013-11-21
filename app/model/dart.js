define([
	'backbone'
],
function (Backbone) {
	var DartModel = Backbone.Model.extend({
		game: null,
		url:'/data/dart.json',
		parse: function (response) {
			this.game = require("game/" + response.game);
			this.game.start(response.options, response.players);
			this.game.history(response.thrws);
			response.game = this.game.render();
			return response;
		}
	});
	return DartModel;
});