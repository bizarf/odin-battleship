import Ship from './ship';

class Gameboard {
    constructor() {
        this.board = [];
        this.makeBoard();
        this.ships = [];
        this.carrierPlaced = false;
        this.battleshipPlaced = false;
        this.cruiserPlaced = false;
        this.submarinePlaced = false;
        this.destroyerPlaced = false;
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

    resetBoard() {
        this.board = [];
        this.makeBoard()
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
            if ((pos[1] + length) - 1 > 7) return false

            for (let i = 0; i < length; i++) {
                if (this.board[pos[0]][pos[1] + i].ship === false) {
                    arr.push(this.board[pos[0]][pos[1] + i].ship)
                }
            }
        }

        if (direction === 'vert') {
            if ((pos[0] + length) - 1 > 7) return false

            for (let i = 0; i < length; i++) {
                if (this.board[pos[0] + i][pos[1]].ship === false) {
                    arr.push(this.board[pos[0] + i][pos[1]].ship)
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

    // place all 5 ship pieces randomly on the board
    placeShipTeamRandomly() {
        const shipDirection = ['hor', 'vert']
        const randomShipDirection = Math.floor(Math.random() * 2);
        const x = Math.floor(Math.random() * 8)
        const y = Math.floor(Math.random() * 8)
        const position = [x, y];

        if (this.carrierPlaced === false) {
            this.placeShipPieceRandomly(position, 5, shipDirection, randomShipDirection, 'carrier')
        }

        if (this.battleshipPlaced === false) {
            this.placeShipPieceRandomly(position, 4, shipDirection, randomShipDirection, 'battleship')
        }

        if (this.cruiserPlaced === false) {
            this.placeShipPieceRandomly(position, 3, shipDirection, randomShipDirection, 'cruiser')
        }

        if (this.submarinePlaced === false) {
            this.placeShipPieceRandomly(position, 3, shipDirection, randomShipDirection, 'submarine')
        }

        if (this.destroyerPlaced === false) {
            this.placeShipPieceRandomly(position, 2, shipDirection, randomShipDirection, 'destroyer')
        }
    }

    // function that puts the piece in the parameters on the board. 
    placeShipPieceRandomly(position, length, shipDirection, randomShipDirection, ship) {
        if (this.isPlaceable(position, length, shipDirection[randomShipDirection]) === false) {
            this.placeShipTeamRandomly()
        }
        if (this.isPlaceable(position, length, shipDirection[randomShipDirection]) === true) {
            this.placeShip(position, shipDirection[randomShipDirection], ship, length);
            this.shipPlacedTrue(ship)
        }
    }

    // switch statement to mark the ship has been placed on the board. required for the recursion that happens in placeShipTeamRandomly, and placeShipPieceRandomly. without this, the function will never end. 
    shipPlacedTrue(shipPlaced) {
        switch (shipPlaced) {
            case 'carrier':
                this.carrierPlaced = true;
                break;
            case 'battleship':
                this.battleshipPlaced = true;
                break;
            case 'cruiser':
                this.cruiserPlaced = true;
                break;
            case 'submarine':
                this.submarinePlaced = true;
                break;
            case 'destroyer':
                this.destroyerPlaced = true;
                break;
        }
    }
}

export default Gameboard;