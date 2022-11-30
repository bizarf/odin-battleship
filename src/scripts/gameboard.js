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
                    ship: false,
                    hit: false,
                    missedShot: false
                };
            }
        }
    }

    // place the ship on the board, and then push the ship object into the board's ship array. 
    placeShip(pos, direction, ship, length) {
        if (this.isPlaceable(pos, length, direction) === true) {
            const gameShip = new Ship(ship, length);
            this.ships.push(gameShip);
            if (direction === 'hor') {
                for (let i = 0; i < length; i++) {
                    this.board[pos[0]][pos[1] + i].ship = ship;
                };
            };

            if (direction === 'vert') {
                for (let i = 0; i < length; i++) {
                    this.board[pos[0] + i][pos[1]].ship = ship;
                }
            };
        };
        return false;
    };

    // checks the board to see if a ship occupies that space
    isPlaceable(pos, length, direction) {
        // array to store if there is no ship at position in upcoming loops
        const arr = []

        if (direction === 'hor') {
            // prevent placing a ship off the board
            if (pos[1] + length - 1 > 7) return false

            for (let i = 0; i < length; i++) {
                if (this.board[pos[0]][pos[1] + i].ship === false) {
                    arr.push(this.board[pos[0]][pos[1] + i].ship)
                }
            }
        }

        if (direction === 'vert') {
            if (pos[0] + length - 1 > 7) return false

            for (let i = 0; i < length; i++) {
                if (this.board[pos[0] + i][pos[1]].ship === false) {
                    arr.push(this.board[pos[0] + 1][pos[1]].ship)
                }
            }
        }

        // compare array holding "false" if there is no ship, with the provided length of ship we want to place. if it doesn't match, then there is a ship in the way. 
        if (arr.length != length) {
            return false
        } else return true
    }

    // takes a position and checks if a ship is there. if so then run the hit function for that specific ship, and also set the hit property to true for this square. if no ship, then set the missedshot property to true for that square.
    receiveAttack(pos) {
        const attackPosition = this.board[pos[0]][pos[1]];

        if (attackPosition.hit === true || attackPosition.missedShot === true) {
            return false;
        }

        if (attackPosition.ship != false) {
            const shipIndex = this.getShipIndex(attackPosition.ship);
            this.ships[shipIndex].hit();
            attackPosition.hit = true;
            return true
        }

        if (attackPosition.ship === false) {
            attackPosition.missedShot = true;
            return true
        }
    }

    // search the ships array, and return the index for the specific ship name. 
    getShipIndex(shipPiece) {
        return this.ships.map(ship => ship.name).indexOf(shipPiece)
    }

    // search the ships array, and uses the every function to check if all of the isSunk() function returns are either true or false. If all are true, then it'll return true. If not, then false. 
    checkAllShipStatus() {
        return this.ships.map(ship => ship.isSunk()).every(status => {
            if (status === true) return true;
        })
    };
}

export default Gameboard;