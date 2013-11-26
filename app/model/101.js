define([
	'backbone',
	'underscore'
],
function (Backbone, _) {
	var DartModel = Backbone.Model.extend({
		game: null,
		options: {
			name: "darts",
			winningScore: 101,
			dartsPerTurn: 3,
			winner: null
		},
		url:'/data/dart.json',
		initialize: function () {
			this.listenTo(this, 'sync', function(){
				this.start(this.get('options'), this.get('players'), this.get('dartsThrown'));
			});
		},
		start: function (options, players, dartsThrown) {
			this.attributes.options = _.extend(this.options, options);


			this.attributes.players = _.map(players, 
				function(player){
					return {
						name: player,
						throwsLeft: 0,
						score: 0,
						scoreToWin: this.attributes.options.winningScore,
						preBustScore:0,
						busts: 0,
						won: false,
						playerThrows: []
					};
				}, this);

			this.attributes.players[0].throwsLeft = this.attributes.options.dartsPerTurn;
			
			this.attributes.dartsThrown = [];
			
			_.each(dartsThrown, function(dartThrow, tindex){
				this.throwDart(dartThrow.region, dartThrow.multi, true);
			}, this);
			
			this.trigger('ready');
		},
		throwDart: function (region, multi, supress) {
			
			if(this.options.winner !== null){
				return;
			}

			var dartsThrown = this.attributes.dartsThrown.length;
			var playerCount = this.attributes.players.length;
			var currentPlayerIndex =  Math.floor(dartsThrown / this.attributes.options.dartsPerTurn);

			while(currentPlayerIndex >= playerCount){
				currentPlayerIndex = currentPlayerIndex - playerCount;
			}
	
			var thrw = {region: region, multi: multi};
			var player = this.attributes.players[currentPlayerIndex];
			player.score = player.score + (region * multi);	

			if(player.score > this.attributes.options.winningScore){
				player.busts = player.busts + 1;
				player.score = player.preBustScore;
				player.playerThrows.push(thrw);
				player.throwsLeft = player.throwsLeft - 1;

				while(player.throwsLeft !== 0){
					player.playerThrows.push({region:0, multi: 0, bust:true});
					player.throwsLeft = player.throwsLeft - 1;
				}

			} else if (player.score === this.attributes.options.winningScore){
				this.attributes.options.winner = player.name;
				player.won = true;
				player.playerThrows.push(thrw);
				player.scoreToWin = 0;
			} else {
				player.playerThrows.push(thrw);
				player.throwsLeft = player.throwsLeft - 1;
				player.scoreToWin = this.attributes.options.winningScore - player.score;
			}
			
			var thrownDart = _.extend(thrw, {name: player.name, total: thrw.region * thrw.multi})
			this.attributes.dartsThrown.push(thrownDart);

			if(player.throwsLeft === 0){
				player.preBustScore = player.score;
				var nextplayer = currentPlayerIndex + 1;
				if(nextplayer >= playerCount){
					nextplayer = 0;
				}
				this.attributes.players[nextplayer].throwsLeft = this.attributes.options.dartsPerTurn;
			}
			this.trigger('ready');
		},
		gameResults: function () {
			return {
				players: this.get('players'),
				options: this.get('options'),
				dartsThrown: this.get('dartsThrown')
			};
		},
		hasWinner: function () {
			return this.get('options').winner != null;
		},
		winner: function () {
			return this.get('options').winner;
		}

	});
	return DartModel;
});