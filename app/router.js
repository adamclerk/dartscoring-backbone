define([ 
	'jquery', 
	'backbone',
	'handlebars', 
	'view/dart',
	'model/dart'
], 
function(
	$, 
	Backbone, 
	Handlebars, 
	DartView,
	DartModel
){
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