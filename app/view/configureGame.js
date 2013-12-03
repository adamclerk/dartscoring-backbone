define([
  'underscore',
  'jquery',
  'backbone',
  'handlebars',
  'codemirror',
  'jsonmode',
  'text!template/configuregame.hbs'
],
function (
  _,
  $,
  Backbone,
  Handlebars,
  codeMirror,
  jsonmode,
  configGameView
) {
  var NewGameView = Backbone.View.extend({
    initialize: function (options) {
      this.gametype = options.gametype;
      var Game = require('game/' + options.gametype);
      this.game = new Game();
      this.render();
    },
    events: {
      'click #startGame': 'startGame'
    },
    render: function () {
      var template = Handlebars.compile(configGameView);
      var model = {};
      model.defaultOptions = JSON.stringify(this.game.defaultOptions, null, 4);
      model.gametype = this.gametype;
      this.$el.html(template(model));
      this.code = codeMirror.fromTextArea(document.getElementById('code'), {
          mode:  'application/json',
          theme: 'eclipse',
          tabSize: 2
        });
    },
    startGame: function (ev) {
      ev.preventDefault();
      $('.error').html('');
      var sdefaultOptions = this.code.getValue();
      var gametype = $('#gametype').val();
      var id = $('#id').val();
      var name = $('#name').val();
      var players = $('#players').val().split(',');
      var options = {};
      try {
        options = JSON.parse(sdefaultOptions);
      } catch (err) {
        $('.error').html('<div class="message">An error has occured when parsing your default options</div>');
        $('.error').append('<br/>');
        $('.error').append(err);
        return;
      }
      options = _.extend(options, this.game.defaultOptions);
      options.game = gametype;
      options.name = name;

      var data = {
        options: options,
        players: players,
        dartsThrown: []
      };

      data.id = id;

      $.ajax({
        type: 'POST',
        url: '/data/games',
        data: {data: JSON.stringify(data)},
        success: function () {
          Backbone.history.navigate('/play/' + id, true);
        },
        error: function (err) {
          $('.error').html('<div class="message">An error has occured when starting your game</div>');
          $('.error').append('<br/>');
          $('.error').append(err);
        }
      });
    }
  });
  return NewGameView;
});

