define(['underscore'], function (_) {
	return (function(_){

		var options = {
			darts: 3,
			winning_score: 101,
			winner: null
		};
		var players = [];
		var thrws = [];

		var start = function (o, p) { 
			options = _.extend(options, o);
			players = _.map(p, function(player){
				return {
					name: player,
					throws_left: 0,
					score: 0,
					thrws: []
				}
			});
			players[0].throws_left = options.darts;
		};

		var thrw = function (region, multi, thrwindex){
			if(thrwindex === undefined){
				thrwindex = thrws.length;
			}

			var player_count = players.length;
			currentplayer_index =  Math.floor(thrwindex / options.darts);
			while(currentplayer_index >= player_count){
				currentplayer_index = currentplayer_index - player_count;
			}
			var thrw = {region: region, multi: multi};
			var player = players[currentplayer_index];
			player.score = player.score + (region * multi);
			player.thrws.push(thrw);
			player.throws_left = player.throws_left - 1;

			thrws.push(thrw);

			if(player.throws_left == 0){
				var nextplayer = currentplayer_index + 1;
				if(nextplayer >= player_count){
					nextplayer = 0;
				}
				players[nextplayer].throws_left = options.darts;
			}
		}

		var history = function (thrws) { 
			_.each(thrws, function(t, tindex){
				thrw(t.region, t.multi, tindex);
			});
		};

		var render = function () {
			return {
				players:players,
				thrws: thrws,
				options:options
			}
		};

		return {start: start, history: history, render: render, thrw: thrw};

	}(_));

});