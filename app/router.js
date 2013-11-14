define(['backbone'], function(Backbone){
	var router = Backbone.Router.extend({
		routes: {
			"": "index"
		},
		index: function(){}
	});

	return router;
});