define([
	'underscore',
	'backbone',
	'model/player',
	'model/dartThrow'
],
function (_, Backbone, Player, DartThrow) {
	var DartScoringModel = Backbone.Model.extend({
		backend: {name: 'dartbackend'},
		constructor: function (gameid) {
			if(!gameid){
				gameid = parseInt(Math.random() * 10000);
			}

			this.backend.channel = gameid;

			this.players = new Player.Collection(null, {gameid: gameid});
			this.players.listenTo('change', this.save, this);

			this.dartsThrown = new DartThrow.Collection(null, {gameid: gameid});
			this.dartsThrown.listenTo('change', this.save, this);

			Backbone.Model.apply(this, arguments);
		},
		parse: function (resp) {
			this.players.set(resp.players, {parse: true, remove: false});
			delete resp.players;

			this.dartsThrown.set(resp.dartsThrown, {parse: true, remove: false});
			delete resp.dartsThrown;

			return resp;
		},
		toJSON: function (){
			var attrs = _.clone(this.attributes);
			attrs.players = this.players.toJSON();
			attrs.dartsThrown = this.dartsThrown.toJSON();
		}

	});
	return DartScoringModel;
});