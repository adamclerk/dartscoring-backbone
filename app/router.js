define(['backbone', 'jquery', 'handlebars'], 
	function(Backbone, $, Handlebars){

	var DartModel = Backbone.Model.extend({});

	var DartView = Backbone.View.extend({
		initialize: function () {
			this.render();
		},
		render: function () {
			var source = $('script#dartboardhbs').text();
			var template = Handlebars.compile(source);
			this.$el.html(template(this.model.toJSON()));
		}
	});

	var router = Backbone.Router.extend({
		routes: {
			"": "index"
		},
		index: function(){
			var dartmodel = new DartModel({
				game: '101',
				player_count: 6
			});
			
			new DartView({
				el: '.dartboard',
				model: dartmodel
			});
		}
	});

	return router;
});