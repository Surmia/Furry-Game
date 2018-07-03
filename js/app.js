var Game = require('./game.js');

document.addEventListener('DOMContentLoaded', function () {

    var game = new Game();
    game.showFurry();
    game.showCoin();
    game.startGame();

    document.addEventListener('keydown', function(event){
        game.turnFurry(event);
    });


});

