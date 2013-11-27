define([
	'backbone'
],
function (Backbone) {
	var PlayerModel = Backbone.Model.extend({});
	var PlayerCollection = Backbone.Collection.extend({
		model: PlayerModel
	});
	return {Model: PlayerModel, Collection: PlayerCollection};
});