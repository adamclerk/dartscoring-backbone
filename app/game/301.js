define([
  'underscore'
], function(
  _
){
  return function() {
    this.name = '301';
    this.defaultOptions = {
      winningScore: 301,
      dartsPerPlayer: 3
    };
    this.summary = 'The class game of darts.';
    this.rulesLink = 'http://www.lysator.liu.se/nanny/clubs/dart/301_rules.html';
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
      retVal.players = this.players;
      retVal.throwHistory = this.throwHistory;
      retVal.gameHistory = this.gameHistory;
      retVal.winner = this.winner;
      return retVal;
    };

    this.throwDart = function (dart) {
      if(this.winner){
        return;
      }

      this.throwHistory.push(dart);
      var playerCount = this.players.length;
      var currentPlayerIndex = Math.floor(this.dartsThrownCount / this.options.dartsPerPlayer);

      while(currentPlayerIndex >= playerCount){
        currentPlayerIndex = currentPlayerIndex - playerCount;
      }

      var player = this.players[currentPlayerIndex];
      if(player){
        player.score = player.score + (dart.region * dart.multi);
        player.playerThrows.push(dart);

        if(player.score > this.options.winningScore){ //bust 
          player.busts = player.busts + 1;
          player.score = player.preBustScore;
          player.throwsLeft = player.throwsLeft - 1;

          while(player.throwsLeft !== 0){
            var bust = {region:0, multi: 0, bust:true};
            player.playerThrows.push(bust);
            this.throwHistory.push(bust);
                      player.throwsLeft = player.throwsLeft - 1;
          }
        } else if(player.score === this.options.winningScore) { 
          this.winner = player;
                  player.won = true;
                  player.scoreToWin = 0;
        } else {
                  player.throwsLeft = player.throwsLeft - 1;
                  player.scoreToWin = this.options.winningScore - player.score;
        }

        var thrownDart = _.extend(dart, {name: player.name, total: dart.region * dart.multi});
        this.gameHistory.push(thrownDart);

        if(player.throwsLeft === 0){
            player.preBustScore = player.score;
            var nextplayer = currentPlayerIndex + 1;
            if(nextplayer >= playerCount){
                    nextplayer = 0;
            }
            this.players[nextplayer].throwsLeft = this.options.dartsPerPlayer;
        }
      }
      
      this.dartsThrownCount++;
    };
  };
});