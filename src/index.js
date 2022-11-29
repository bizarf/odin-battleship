import Player from "./scripts/player";
import * as dom from "./scripts/DOM"

export const human = new Player('human');
const computer = new Player('computer');
dom.makePlayerBoardDOM();
dom.makeComputerBoardDOM();

dom.getPlayerBoardPosition()
dom.getComputerBoardPosition()
human.board.placeShip([0, 0], 'hor', 'carrier', 5);
human.board.placeShip([2, 4], 'hor', 'cruiser', 3);
console.log(human.board.board)
// human.randomShipPlacement()
dom.renderPlayerShips()