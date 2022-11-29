import Gameboard from "./gameboard";

class Player {
    constructor(name) {
        this.name = name;
        this.turn = null;
        this.board = new Gameboard();
    }

    computerPlay() {
        if (this.turn === true) {
            const x = Math.floor(Math.random() * 8);
            const y = Math.floor(Math.random() * 8);
            const move = [x, y]
            return move
        }
        //  make computer send random shot
        // if square does not contain either hit:true, or missedShot: true then mark on the human player boards depending on if a ship is there
        // if square does contain either hit:true or missedShot: true then redo random shot
    }

    randomShipPlacement() {
        const shipDirection = ['hor', 'vert']
        const randomShipDirection = Math.floor(Math.random() * shipDirection.length);
        const x = Math.floor(Math.random() * 8)
        const y = Math.floor(Math.random() * 8)
        const position = [x, y]
        const ships = [{
                ship: 'carier',
                length: 5
            },
            {
                ship: 'battleship',
                length: 4
            },
            {
                ship: 'cruiser',
                length: 3
            },
            {
                ship: 'destroyer',
                length: 2
            }
        ]

        // this.board.placeShip([0, 0], 'vert', 'carrier', 5);
        console.log(this.board.isPlaceable([0, 0], 5, 'hor'))
    }
}

export default Player;