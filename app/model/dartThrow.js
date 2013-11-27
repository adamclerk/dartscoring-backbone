define([
	'backbone'
],
function (Backbone) {
	var ThrowModel = Backbone.Model.extend({});
	var ThrowCollection = Backbone.Collection.extend({
		model: ThrowModel
	});
	return {Model: ThrowModel, Collection: ThrowCollection};
});