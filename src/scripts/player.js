import Gameboard from "./gameboard";
import {
    human,
} from "../index";

class Player {
    constructor(name) {
        this.name = name;
        this.turn = false;
        this.board = new Gameboard();
    }

    computerPlay() {
        const x = Math.floor(Math.random() * 8);
        const y = Math.floor(Math.random() * 8);
        const move = [x, y];

        if (human.board.receiveAttack(move) === true) {
            human.board.receiveAttack(move);
            return;
        }

        if (human.board.receiveAttack(move) === false) {
            this.computerPlay();
        };
    }
};

export default Player;