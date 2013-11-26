define([ 
	'jquery', 
	'backbone',
	'handlebars', 
	'view/dart',
	'model/101'
], 
function(
	$, 
	Backbone, 
	Handlebars, 
	DartView,
	Dart101Model
){
	var router = Backbone.Router.extend({
		routes: {
			"": "index"
		},
		index: function(){
			var dart101model = new Dart101Model();
			
			new DartView({
				el: '.dartscoring',
				model: dart101model
			});

			dart101model.fetch();
		}
	});

	return router;
});