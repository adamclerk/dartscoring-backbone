require.config({
	baseUrl: '/',
	paths: {
		'router': 'app/router',
		'model': 'app/model',
		'view': 'app/view',
		'collection': 'app/collection',
		'jquery': 'static/bower/jquery/jquery.min',
		'underscore': 'static/bower/underscore/underscore-min',
		'backbone': 'static/bower/backbone/backbone-min'
	},
	shim: {
		'jqjery':{
			exports: '$'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

require(['backbone', 'router'], function(Backbone, Router) {
	new Router();
	Backbone.history.start({pushState: true, root:'/'});
});