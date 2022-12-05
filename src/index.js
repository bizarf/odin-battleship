import Player from "./scripts/player";
import * as dom from "./scripts/DOM"

export const human = new Player('human');
export const computer = new Player('computer');
dom.makePlayerBoardDOM();
dom.makeComputerBoardDOM();
dom.domBtnInit()

export const gameLogic = () => {
    const computerBoardSquare = document.querySelectorAll('.computerBoardSquare');
    const playerBoardSquare = document.querySelectorAll('.playerBoardSquare')
    const winnerText = document.querySelector('.winnerText');
    const gameOverModal = document.querySelector('.gameOverModal')

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