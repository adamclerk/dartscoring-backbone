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
			":game": "game"
		},
		index: function () {
			console.log('start new game');
		},
		game: function(game){
			var modeloptions = {};

			if(game){
				modeloptions.id = game;
			}

			var dartmodel = new DartScoringModel(modeloptions);
			new DartScoringView({
				el: '.content',
				model: dartmodel
			});

			dartmodel.fetch();
		}
	});

	return router;
});