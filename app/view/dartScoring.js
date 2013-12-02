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
	dartviewtemplate
) {
	var DartView = Backbone.View.extend({
		initialize: function () {
			//this.listenTo(this.model, 'all', function(){console.log(arguments)});
			this.listenTo(this.model, 'change', this.render);
		},
		events:{
			"click .region": "throwDart",
			"mouseenter .region": "hoverStart",
			"mouseleave .region": "hoverEnd"
		},
		render: function () {
			var template = Handlebars.compile(dartviewtemplate);
			console.log(this.model.toJSON());
			this.$el.html(template(this.model.toJSON()));
		},
		hoverStart: function(ev){
			ev.preventDefault();
			var ele = $(ev.currentTarget);
			ele.css("opacity","0.6");
		},
		hoverEnd: function(ev){
			ev.preventDefault();
			var ele = $(ev.currentTarget);
			ele.css("opacity","1");
		},
		throwDart: function (ev) {
			ev.preventDefault();
			var ele = $(ev.currentTarget);
			var dart = {region: ele.attr('data-value'), multi: ele.attr('data-multi')};
			this.model.throwDart(dart);
		}

	});
	return DartView;
});

