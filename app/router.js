define([ 
	'jquery', 
	'backbone',
	'handlebars', 
	'view/dartScoring',
	'model/dartScoring'
], 
function(
	$, 
	Backbone, 
	Handlebars, 
	DartScoringView,
	DartScoringModel
){
	var router = Backbone.Router.extend({
		routes: {
			"": "index",
			":game": "index"
		},
		index: function(game){

			var modeloptions = {url: '/data/game'};
			if(game){
				modeloptions.id = game;
			}
			
			var dartmodel = new DartScoringModel(modeloptions);
			new DartScoringView({
				el: '.content',
				model: dartmodel
			});
		}
	});

	return router;
});