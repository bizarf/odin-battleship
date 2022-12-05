import Player from "./scripts/player";
import * as dom from "./scripts/DOM"

export const human = new Player('human');
export const computer = new Player('computer');
dom.makePlayerBoardDOM();
dom.makeComputerBoardDOM();

// debug function. remove later
// dom.getPlayerBoardPosition()

const gameLogic = () => {
    const computerBoardSquare = document.querySelectorAll('.computerBoardSquare');
    const playerBoardSquare = document.querySelectorAll('.playerBoardSquare')
    const winnerText = document.querySelector('.winnerText');

    computerBoardSquare.forEach(square => square.addEventListener('click', () => {
        const x = parseInt(square.dataset.pos[0])
        const y = parseInt(square.dataset.pos[2])
        const position = [x, y]
        if (computer.board.checkAllShipStatus() === false) {
            computer.board.receiveAttack(position)
            dom.renderComputerBoard()
            if (computer.board.checkAllShipStatus() === true) {
                computerBoardSquare.forEach(square => square.classList.add('disableBoards'))
                playerBoardSquare.forEach(square => square.classList.add('disableBoards'))
                dom.renderComputerBoard()
                dom.renderPlayerBoard();
                winnerText.textContent = 'Congratulations. You win!'
                gameOverModal.style.display = 'block';
                return;
            }
        }
        // human.endTurn()
        if (human.board.checkAllShipStatus() === false) {
            computer.computerPlay()
            dom.renderPlayerBoard()
            if (human.board.checkAllShipStatus() === true) {
                computerBoardSquare.forEach(square => square.classList.add('disableBoards'))
                playerBoardSquare.forEach(square => square.classList.add('disableBoards'))
                dom.renderPlayerBoard()
                dom.renderComputerBoard()
                winnerText.textContent = 'The computer has sunk all your ships!'
                gameOverModal.style.display = 'block'
                return;
            }
        }
    }))
}

// start game button
const startBtn = document.querySelector('#startBtn');
const playerPieces = document.querySelector('.playerPieces')
const computerBoard = document.querySelector('.computerBoard')
startBtn.addEventListener('click', () => {
    computer.board.placeShipTeamRandomly()
    playerPieces.style.display = 'none'
    computerBoard.style.display = 'grid'
    gameLogic();
    startBtn.disabled = true;
})

const playerShipRandomPlacementBtn = () => {
    const carrier = document.querySelector('#carrierPiece');
    const battleship = document.querySelector('#battleshipPiece');
    const cruiser = document.querySelector('#cruiserPiece');
    const submarine = document.querySelector('#submarinePiece');
    const destroyer = document.querySelector('#destroyerPiece');
    const playerTeamRandomizeBtn = document.querySelector('#playerTeamRandomizeBtn')
    playerTeamRandomizeBtn.addEventListener('click', () => {
        human.board.placeShipTeamRandomly();
        carrier.style.display = 'none';
        battleship.style.display = 'none';
        cruiser.style.display = 'none';
        submarine.style.display = 'none';
        destroyer.style.display = 'none';
        dom.renderPlayerBoard();
        dom.enableStartButton();
    });
};
playerShipRandomPlacementBtn();

// gameover modal checker. remove when project is complete
const gameOverTest = document.querySelector('#gameOverTest')
const gameOverModal = document.querySelector('.gameOverModal')
gameOverTest.addEventListener('click', () => {
    gameOverModal.style.display = 'block'
})

dom.clearAndResetBoard()
dom.shipDragEnable.init()
dom.shipPieceDropped()