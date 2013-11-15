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
			this.render();
		},
		render: function () {
			var template = Handlebars.compile(dartviewtemplate);
			this.$el.html(template(this.model.toJSON()));
		}
	});
	return DartView;
});

