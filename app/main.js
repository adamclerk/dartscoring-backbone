require.config({
	baseUrl: '/',
	paths: {
		'router': 'app/router',
		'model': 'app/model',
		'view': 'app/view',
		'collection': 'app/collection',
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

require(['backbone', 'router'], function(Backbone, Router) {
	new Router();
	Backbone.history.start({pushState: true, root:'/'});
});