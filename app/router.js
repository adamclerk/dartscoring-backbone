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
			var dartmodel = new DartModel();
			
			new DartView({
				el: '.dartscoring',
				model: dartmodel
			});

			dartmodel.fetch();
		}
	});

	return router;
});