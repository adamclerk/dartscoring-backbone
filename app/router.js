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
	console.log('router started');
	var router = Backbone.Router.extend({
		routes: {
			"": "index",
			":game": "game"
		},
		index: function () {
			console.log('start new game');
		},
		game: function(game){
			console.log('index');
			var modeloptions = {url: '/data/game'};

			if(game){
				modeloptions.id = game;
			}
			var dartmodel = new DartScoringModel(modeloptions);
			var dartview = new DartScoringView({
				el: '.content',
				model: dartmodel
			});

			dartmodel.fetch();
			dartview.render();
		}
	});

	return router;
});