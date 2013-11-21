require.config({
	baseUrl: '/',
	paths: {
		'router': 'app/router',
		'model': 'app/model',
		'view': 'app/view',
		'collection': 'app/collection',
		'game': 'app/game',
		'template': 'static/template',
		text: 'static/bower/requirejs-text/text',
		'jquery': 'static/bower/jquery/jquery.min',
		'underscore': 'static/bower/underscore/underscore-min',
		'backbone': 'static/bower/backbone/backbone-min',
		'handlebars': 'static/bower/handlebars/handlebars.min'
	},
	shim: {
		'jquery':{
			exports: '$'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'handlebars': {
			exports: 'Handlebars'
		}
	}
});

require(['game/101'], function(){
	//console.log('loading games');
});

require(['backbone', 'router'], function(Backbone, Router) {
	new Router();
	Backbone.history.start({pushState: true, root:'/'});
});

