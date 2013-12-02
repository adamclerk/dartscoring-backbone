define([
  'jquery',
  'underscore',
  'backbone', 
  'handlebars',
  'text!template/newgame.hbs',
  'game/301',
  'game/cricket'
], 
function (
  $,
  _,
  Backbone, 
  Handlebars,
  newGameView
) {
  var Games = _.rest(arguments, 5);
  var NewGameView = Backbone.View.extend({
    initialize: function () {
      this.games = _.map(Games, function(Game){
        return new Game();
      });
    },
    render: function () {
      var template = Handlebars.compile(newGameView);
      this.$el.html(template(this.games));
    }
  });
  return NewGameView;
});

