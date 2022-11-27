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

    // place the ship on the board, and then push the ship object into the board's ship array. 
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
                // prevent placing a ship off the board
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

    // takes a position and checks if a ship is there. if so then run the hit function for that specific ship, and also set the hit property to true for this square. if no ship, then set the missedshot property to true for that square.
    receiveAttack(pos) {
        const attackPosition = this.board[pos[0]][pos[1]];

        if (attackPosition.ship != null) {
            const shipIndex = this.getShipIndex(attackPosition.ship);
            this.ships[shipIndex].hit();
            attackPosition.hit = true;
        }

        if (attackPosition.ship === null) {
            attackPosition.missedShot = true;
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