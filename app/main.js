require.config({
	baseUrl: '/',
	paths: {
		'router': 'app/router',
		'model': 'app/model',
		'view': 'app/view',
		'collection': 'app/collection',
		'event': 'app/event',
		'template': 'static/template',
		text: 'static/bower/requirejs-text/text',
		'jquery': 'static/bower/jquery/jquery.min',
		'underscore': 'static/bower/underscore/underscore-min',
		'backbone': 'static/bower/backbone/backbone-min',
		'handlebars': 'app/hbs/handlebars',
		'hbs': 'static/bower/handlebars/handlebars.min',
		'socket.io': 'static/bower/socket.io-client/dist/socket.io.min'
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
		}
	}
});

require(['backbone', 'router'], function(Backbone, Router) {
	new Router();
	Backbone.history.start({pushState: false, root:'/'});
});