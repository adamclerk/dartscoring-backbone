define([
	'jquery',
	'backbone',
	'handlebars',
	'view/dartScoring',
	'model/dartScoring',
	'view/newGame',
	'view/configureGame'
],
function (
	$,
	Backbone,
	Handlebars,
	DartScoringView,
	DartScoringModel,
	NewGameView,
	ConfigGameView
) {
	var router = Backbone.Router.extend({
		routes: {
			'': 'newGame',
			'config/:gametype': 'configGame',
			'play/:game': 'playGame'
		},
		newGame: function () {
			var newGameView = new NewGameView({
				el: '.content'
			});
			newGameView.render();
		},
		configGame: function (gametype) {
			new ConfigGameView({
				el: '.content',
				gametype: gametype
			});
		},
		playGame: function (game) {
			var modeloptions = {};

			if (game) {
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