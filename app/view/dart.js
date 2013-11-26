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
		initialize: function () {
			this.listenTo(this.model, 'ready', this.render);
		},
		events:{
			"click .region" : "throwDart"
		},
		throwDart:function(ev){
			ev.preventDefault();
			var ele = $(ev.target);
			this.model.throwDart(ele.attr('data-value'), ele.attr('data-multi'));
		},
		render: function () {
			var template = Handlebars.compile(dartviewtmpl);
			this.$el.html(template(this.model.gameResults()));
		}
	});
	return DartView;
});

