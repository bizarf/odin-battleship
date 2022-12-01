import Player from "./scripts/player";
import * as dom from "./scripts/DOM"

export const human = new Player('human');
export const computer = new Player('computer');
dom.makePlayerBoardDOM();
dom.makeComputerBoardDOM();

dom.getPlayerBoardPosition()
// human.board.placeShip([0, 0], 'hor', 'carrier', 5);
// human.board.placeShip([2, 4], 'hor', 'cruiser', 3);
// human.board.placeShip([2, 0], 'vert', 'battleship', 4);
// human.board.placeShip([4, 2], 'vert', 'submarine', 3);
// human.board.placeShip([4, 4], 'hor', 'destroyer', 2);
// computer.board.placeShip([0, 0], 'hor', 'carrier', 5);
// computer.board.placeShip([2, 4], 'hor', 'cruiser', 3);
// computer.board.placeShip([2, 0], 'vert', 'battleship', 4);
// computer.board.placeShip([4, 2], 'vert', 'submarine', 3);
// computer.board.placeShip([4, 4], 'hor', 'destroyer', 2);
// console.log(human.board.board)
human.board.placeShipTeamRandomly()
computer.board.placeShipTeamRandomly()
dom.renderPlayerBoard()
dom.renderComputerBoard()

const gameLogic = () => {
    const computerBoardSquare = document.querySelectorAll('.computerBoardSquare');
    const playerBoardSquare = document.querySelectorAll('.playerBoardSquare')
    computerBoardSquare.forEach(square => square.addEventListener('click', () => {
        const x = parseInt(square.dataset.pos[0])
        const y = parseInt(square.dataset.pos[2])
        const position = [x, y]
        // console.log(position)
        if (computer.board.checkAllShipStatus() === false) {
            computer.board.receiveAttack(position)
            dom.renderComputerBoard()
            if (computer.board.checkAllShipStatus() === true) {
                console.log('a winner is you')
                computerBoardSquare.forEach(square => square.classList.add('disableBoards'))
                playerBoardSquare.forEach(square => square.classList.add('disableBoards'))
                dom.renderComputerBoard()
                dom.renderPlayerBoard()
            }
        }
        // human.endTurn()
        if (human.board.checkAllShipStatus() === false) {
            computer.computerPlay()
            dom.renderPlayerBoard()
            if (human.board.checkAllShipStatus() === true) {
                console.log('a loser is you')
                computerBoardSquare.forEach(square => square.classList.add('disableBoards'))
                playerBoardSquare.forEach(square => square.classList.add('disableBoards'))
                dom.renderPlayerBoard()
                dom.renderComputerBoard()
            }
        }
    }))
}

const startBtn = document.querySelector('#startBtn');
startBtn.addEventListener('click', () => {
    gameLogic();
    startBtn.disabled = true;
})