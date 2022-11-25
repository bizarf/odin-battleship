import Ship from './ship';

class Gameboard {
    constructor() {
        this.board = [];
        this.makeBoard();
        this.ships = [];
    }

    // make a 8 x 8 game board with a 2 dimensional array
    makeBoard() {
        for (let i = 0; i < 8; i++) {
            this.board[i] = [];
            for (let j = 0; j < 8; j++) {
                this.board[i][j] = {
                    ship: null,
                    hit: null,
                    missedShot: null
                };
            }
        }
    }

    placeShip(pos, direction, ship, length) {
        if (this.isPlaceable(pos, length, direction) === true) {
            const gameShip = new Ship(ship, length)
            this.ships.push(gameShip)
            if (direction === 'hor') {
                for (let i = 0; i < length; i++) {
                    this.board[pos[0]][pos[1] + i].ship = ship
                }
            }

            if (direction === 'vert') {
                for (let i = 0; i < length; i++) {
                    this.board[pos[0] + i][pos[1]].ship = ship
                }
            }
        }
        return false;
    }

    // checks the board to see if a ship occupies that space
    isPlaceable(pos, length, direction) {
        if (direction === 'hor') {
            for (let i = 0; i < length; i++) {
                if ((pos[1] + i) >= 7) return

                if (this.board[pos[0]][pos[1] + i].ship === null) {
                    return true
                }
            }
        }
        if (direction === 'vert') {
            for (let i = 0; i < length; i++) {
                if ((pos[0] + i) >= 7) return

                if (this.board[pos[0] + i][pos[1]].ship === null) {
                    return true
                }
            }
        }
        return false
    }

    receiveAttack(pos) {
        // take position
        // check if ship is there
        // sends the hit function to the correct ship
        // if no ship adds missed shot
    }

    checkAllShipStatus() {
        // go through the ships array
        // invoke the isSunk status to check if each ship is sunk
        // if all ships have sunk, then return game over?
    };
}

export default Gameboard;