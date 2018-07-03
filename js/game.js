var Furry = require('./furry.js');
var Coin = require('./coin.js');

function Game() {
    this.board = document.querySelector('#board').children;
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.ongoingGame = true;
    this.index = function(x,y) {
        return x + (y * 10);
    };
    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x,this.furry.y)].classList.add('furry');
    };
    this.showCoin = function () {
        this.board[this.index(this.coin.x,this.coin.y)].classList.add('coin');
    };
    this.startGame = function () {
        var self = this;
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);
    };
    this.moveFurry = function () {
        if(this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if ( this.furry.direction === "left" ) {
            this.furry.x = this.furry.x - 1;
        } else if ( this.furry.direction === "up" ) {
            this.furry.y = this.furry.y - 1;
        } else if ( this.furry.direction === "down" ) {
            this.furry.y = this.furry.y + 1;
        }
        this.gameOver();
        if (!this.ongoingGame) {
            return;
        }
        this.showFurry();
        this.checkCoinCollision();
    };
    this.hideVisibleFurry = function () {
        var visibleFurry = document.querySelector('.furry');
        if (visibleFurry) {                                  //(visibleFurry !== null)
            visibleFurry.classList.remove('furry');
        }
    };
    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    };
    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
            this.score++;
            document.querySelector('#score strong').innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };
    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            this.ongoingGame = false;
            alert('Game over! Score: ' + this.score);
        }
    }
}

module.exports = Game;
