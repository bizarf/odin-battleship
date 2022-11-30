import Player from "./scripts/player";
import * as dom from "./scripts/DOM"

export const human = new Player('human');
export const computer = new Player('computer');
dom.makePlayerBoardDOM();
dom.makeComputerBoardDOM();

dom.getPlayerBoardPosition()
dom.getComputerBoardPosition()
human.board.placeShip([0, 0], 'hor', 'carrier', 5);
human.board.placeShip([2, 4], 'hor', 'cruiser', 3);
human.board.placeShip([2, 0], 'vert', 'battleship', 4);
human.board.placeShip([4, 2], 'vert', 'submarine', 3);
human.board.placeShip([4, 4], 'hor', 'destroyer', 2);
computer.board.placeShip([0, 0], 'hor', 'carrier', 5);
computer.board.placeShip([2, 4], 'hor', 'cruiser', 3);
computer.board.placeShip([2, 0], 'vert', 'battleship', 4);
computer.board.placeShip([4, 2], 'vert', 'submarine', 3);
computer.board.placeShip([4, 4], 'hor', 'destroyer', 2);
console.log(human.board.board)
// human.randomShipPlacement()
dom.renderPlayerBoard()
dom.renderComputerBoard()

function game() {
    // dom.getComputerBoardPosition()
}

game()