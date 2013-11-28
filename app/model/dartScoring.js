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
			if(!options.id){
				options.id = parseInt(Math.random() * 10000);
			}
			this.id = options.id;

			this.players = new Player.Collection(null, {gameid: options.id});
			//this.players.on('change', this.save, this);

			this.dartsThrown = new DartThrow.Collection(null, {gameid: options.id});
			//this.dartsThrown.on('change', this.save, this);

			Backbone.Model.apply(this, arguments);
		},
		initialize: function () {
			_.bindAll(this, 'addDart');
			this.listenTo(dartEvents, 'dartThrown', this.addDart);
		},
		parse: function (resp) {
			this.players.set(resp.players, {parse: true, remove: false});
			delete resp.players;

			this.dartsThrown.set(resp.dartsThrown, {parse: true, remove: false});
			delete resp.dartsThrown;

			return resp;
		},
		toJSON: function () {
			var attrs = _.clone(this.attributes);
			attrs.players = this.players.toJSON();
			attrs.dartsThrown = this.dartsThrown.toJSON();
			console.log('tojson', attrs);
			return attrs;
		},
		addDart: function (dart) {
			this.dartsThrown.add(dart);
			this.trigger('change');
		},
		throwDart: function (dart) {
			if(!dart){
				return;
			}
			this.addDart(dart);
			dartEvents.emit('throwDart', dart);
		}

	});
	
	return DartScoringModel;
});