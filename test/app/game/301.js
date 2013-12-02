/* jshint expr: true */
define([
  'game/301', 
  'sinon',
  'socket.io'
], function (
  Game, 
  sinon
) {
  describe('games', function(){
    describe('301', function () {
      var game;
      
      describe('start', function () {

        beforeEach(function() {
          game = new Game();
        });

        it('should add players', function() {
          var options = {
            winningScore: 101
          };

          var players = [
            'adam',
            'wes',
            'josh'
          ];

          game.start(players, options);
          expect(game.players.length).to.equal(3);
          expect(game.players[0].name).to.equal('adam');
          expect(game.players[1].name).to.equal('wes');
          expect(game.players[2].name).to.equal('josh');
        });

        it('should have default score of 301', function(){
          game.start(['adam'], {});
          expect(game.options.winningScore).to.equal(301);
          expect(game.players)
            .to.be.an('array')
            .to.have.length(1);
        });

        it('should merge options', function() {
          var options = {
            winningScore: 101,
            dartsPerPlayer: 6
          };
          game.start(['adam'], options);
          expect(game.options.winningScore).to.equal(101);
          expect(game.options.dartsPerPlayer).to.equal(6);
        });
        
        it('should call throwDart with thrownDarts', function(){
          var thrownDarts = [
            {region: 20, multi: 1},
            {region: 20, multi: 1},
            {region: 20, multi: 1}
          ];

          var throwDartSpy = sinon.spy(game, "throwDart");
          game.start(['adam'], {}, thrownDarts);
          expect(throwDartSpy).to.have.been.calledThrice;
        });

        it('should not trigger dart event', function () {
          var thrownDarts = [
            {region: 20, multi: 1},
            {region: 20, multi: 1},
            {region: 20, multi: 1}
          ];

          var throwDartSpy = sinon.spy(game, "throwDart");
          game.start(['adam'], {}, thrownDarts);
          expect(throwDartSpy).to.have.been.calledThrice;
          throwDartSpy.restore();
        });

        it('should create a throwHistory array', function() {
          var thrownDarts = [
            {region: 20, multi: 1},
            {region: 20, multi: 1},
            {region: 20, multi: 1}
          ];

          game.start(['adam'], {}, thrownDarts);
          expect(game.throwHistory)
            .to.be.an('array')
            .to.have.length(3);
        });

        it('should create a gameHistory array', function() {
          var thrownDarts = [
            {region: 20, multi: 1},
            {region: 20, multi: 1},
            {region: 20, multi: 1}
          ];

          game.start(['adam'], {}, thrownDarts);
          expect(game.gameHistory)
            .to.be.an('array')
            .to.have.length(3);
        });

        it('should label a winner', function() {
          game.start(['adam'], {winningScore: 30}, []);
          game.throwDart({region: 10, multi: 1});
          game.throwDart({region: 10, multi: 1});
          game.throwDart({region: 10, multi: 1});

          expect(game.winner.name).to.equal('adam');
          expect(game.players[0].won).to.equal(true);
        });
      });

      describe('info', function () {
        var info;
        beforeEach(function() {
          game = new Game();
          var thrownDarts = [
            {region: 20, multi: 1},
            {region: 20, multi: 1},
            {region: 20, multi: 1}
          ];
          game.start(['adam'], thrownDarts);
          info = game.info();
        });

        it('should return json object', function() {
          expect(info).to.be.an('object');
        });

        it('should have player array', function(){
          expect(info.players)
            .to.exist
            .to.be.an('array');
        });
        it('should have throwHistory array', function(){
          expect(info.throwHistory)
            .to.exist
            .and.to.be.an('array');
        });
        it('should have gameHistory array', function(){
          expect(info.gameHistory)
            .to.exist
            .and.to.be.an('array');
        });
        it('should not have winner object', function(){
          expect(info.winner)
            .to.not.exist;
        });
      });

      describe('throwDart', function () {
        it('should trigger dart event on regular dartThrow', function(){

        });
      });
    });
  });
});