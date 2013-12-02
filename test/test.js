require.config({
	baseUrl: '../',
	paths: {
		'event': 'app/event',
		'jquery': 'static/bower/jquery/jquery.min',
		'underscore': 'static/bower/underscore/underscore-min',
		'sinon': 'static/bower/sinonjs/sinon',
		'backbone': 'static/bower/backbone/backbone-min',
		'socket.io': 'static/bower/socket.io-client/dist/socket.io.min',

		//Duck Tests
		'game.duck': 'test/app/game.duck',

		//Games
		'game': 'app/game',

		//GameTests
		'gametest': 'test/app/game',
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
		'sinon': {
			exports: 'sinon'
		}
	}
});

require(
	['game.duck', 'gametest/301'],
	function() {
		if (window.mochaPhantomJS) { 
			mochaPhantomJS.run(); 
		} else { 
			mocha.run(); 
		}
	}
);