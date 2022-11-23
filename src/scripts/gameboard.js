class Gameboard {
    constructor() {
        this.board = [];
        this.makeBoard();
    }

    // make a 10 x 10 game board with a 2 dimensional array
    makeBoard() {
        for (let i = 0; i < 10; i++) {
            this.board[i] = [];
            for (let j = 0; j < 10; j++) {
                this.board[i][j] = {
                    ship: null,
                    hit: null,
                    missedShot: null
                };
            }
        }
        return board;
    }

    placeShip() {

    }

    receiveAttack(pos1, pos2) {

    }
};

export default Gameboard;