/* jshint expr: true  */
define(['underscore', 'game/301'],function(_){

  var Games = _.rest(arguments, 1);

  describe("duckTests", function(){
    _.each(Games, function(Game){    
      var game = new Game();
      if(game.name){
        describe(game.name, function(){
          it("should have summary string", function() {
            expect(game.summary)
            .to.exist
            .and.to.be.a("string")
            .and.to.not.equal("");
          });

          it("should have rulesLink string", function() {
            expect(game.rulesLink)
            .to.exist
            .and.to.be.a("string", "rules link should be a string")
            .and.to.not.equal("");
          });

          it("should have defaultOptions options", function() {
            expect(game.defaultOptions)
            .to.exist
            .and.to.be.an("object");
          });

          it("should have a start function", function() {
            expect(game.start)
            .to.exist
            .and.to.be.a("function", "this game should include a funciton called start");

            expect(game.start.length)
            .to.equal(3);
          });

          it("should have a info function", function() {
            expect(game.info)
            .to.exist
            .and.to.be.a("function");
          });

          it("should have a throwDart function", function() {
            expect(game.throwDart)
            .to.exist
            .and.to.be.a("function");

            expect(game.throwDart.length)
            .to.equal(1);
          });
        });
      } else {
        console.log(game);
        describe('unamed game', function() {
          it("should have a name", function() {
            expect(game.name).to.exist;
          });
        });
      }
    });
  });
});