define([
  'underscore'
  ], function(_){
  return function() {
      this.name = 'Cricket';
      this.defaultOptions = {
        maxPlayers: 0,
        dartsPerPlayer: 3
      };
      this.summary = 'Cricket is a darts game that uses the standard 20 number dartboard with the triple and double rings.';
      this.rulesLink = 'http://en.wikipedia.org/wiki/Cricket_(darts)';
      this.start = function (players, options, dartsThrown) {

        if(options){
          this.options = _.extend(this.defaultOptions, options);
        } else {
          this.options = this.defaultOptions;
        }

        if(players){
          this.players = _.map(players, 
            function(player){ 
              return { 
                name: player, 
                score: 0, 
                throwsLeft: 0,
                busts: 0,
                preBustScore: 0,
                won: false,
                playerThrows: []
              };
            }
          );
        } else {
          throw "Please provide at least one player";
        }

        if(this.players[0]){
          this.players[0].throwsLeft = 3;
        }

        this.throwHistory = [];

        this.gameHistory = [];

        this.dartsThrownCount = 0;

        if(dartsThrown){
          for(var i = 0; i < dartsThrown.length; i++){
            var dartThrown = dartsThrown[i];
            this.throwDart(dartThrown, true);
          }
        }
      };

      this.info = function() {
        var retVal = {};
        retVal.players = _.map(this.players, function(player){ return {name: player}; });
        retVal.throwHistory = this.throwHistory;
        retVal.gameHistory = this.gameHistory;
        retVal.winner = this.winner;
        return retVal;
      };

      this.throwDart = function (dart, init) {
        console.log(dart, init);
    };
  };
});