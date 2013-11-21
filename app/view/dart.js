define([
	'jquery',
	'backbone', 
	'handlebars',
	'text!template/dartview.hbs'
], 
function (
	$,
	Backbone, 
	Handlebars,
	dartviewtmpl
) {
	var DartView = Backbone.View.extend({
		theboard:{},
		initialize: function () {
			this.theboard = this.board();
			this.listenToOnce(this.model, 'change', this.startgame);
		},
		events:{
			"click .region" : "thrw_dart"
		},
		thrw_dart:function(ev){
			ev.preventDefault();
			var ele = $(ev.target);
			
			this.model.game.thrw(ele.attr('data-value'), ele.attr('data-multi'));
			this.render({game: this.model.game.render()});
		},
		startgame: function(){
			var model = this.model.toJSON();
			this.render(model);
		},
		render: function (model) {
			var template = Handlebars.compile(dartviewtmpl);
			model.board = this.theboard;
			this.$el.html(template(model));
		},
		board: function(){
			var board = {regions:[]};
			board.regions.push({klass:'double', value:25, multi: 2});
			board.regions.push({klass:'single', value:25, multi: 1});
			for(var i = 20; i > 0; i--){
				board.regions.push({klass:'triple', value: i, multi: 3});
				board.regions.push({klass:'double', value: i, multi: 2});
				board.regions.push({klass:'single', value: i, multi: 1});
			}
			return board;
		}
	});
	return DartView;
});

