define([
	'hbs',
	'text!template/dartboard.hbs'
],
function (Handlebars, dartboard) {
	Handlebars.registerPartial('dartboard', dartboard);
	return Handlebars;
});