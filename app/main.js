require.config({
	baseUrl: '/',
	paths: {
		'router': 'app/router',
		'model': 'app/model',
		'view': 'app/view',
		'collection': 'app/collection',
		'template': 'static/template',
		text: 'static/bower/requirejs-text/text',
		'jquery': 'static/bower/jquery/jquery.min',
		'underscore': 'static/bower/underscore/underscore-min',
		'backbone': 'static/bower/backbone/backbone-min',
		'handlebars': 'app/hbs/handlebars',
		'hbs': 'static/bower/handlebars/handlebars.min',
		'socket.io': 'socket.io/socket.io',
		'backbone.io': 'socket.io/backbone.io'
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
		'hbs': {
			exports: 'Handlebars'
		},
		'socket.io': {
			exports: 'io'
		},
		'backbone.io': {
			deps: ['socket.io','underscore','backbone']
		}
	}
});

require(['backbone', 'router', 'backbone.io'], function(Backbone, Router) {
	Backbone.io.connect();
	new Router();
	Backbone.history.start({pushState: false, root:'/'});
});