import {
    human,
    computer
} from "../index";

const playerBoard = document.querySelector('.playerBoard')
const computerBoard = document.querySelector('.computerBoard')

export const makePlayerBoardDOM = () => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            square.classList = 'playerBoardSquare';
            square.dataset.pos = [i, j]
            playerBoard.appendChild(square);
        }
    }
}

export const makeComputerBoardDOM = () => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            square.classList = 'computerBoardSquare';
            square.dataset.pos = [i, j]
            computerBoard.appendChild(square);
        }
    }
}

export const getPlayerBoardPosition = () => {
    const playerBoardSquare = document.querySelectorAll('.playerBoardSquare');
    playerBoardSquare.forEach(square => square.addEventListener('click', () => {
        const x = parseInt(square.dataset.pos[0])
        const y = parseInt(square.dataset.pos[2])
        const position = [x, y]
        console.log(position)
    }))
}

export function getComputerBoardPosition() {
    const computerBoardSquare = document.querySelectorAll('.computerBoardSquare');
    computerBoardSquare.forEach(square => square.addEventListener('click', () => {
        const x = parseInt(square.dataset.pos[0])
        const y = parseInt(square.dataset.pos[2])
        const position = [x, y]
        // console.log(position)
        if (computer.board.checkAllShipStatus() === false) {
            computer.board.receiveAttack(position)
            renderComputerBoard()
        }
        // human.endTurn()
        if (human.board.checkAllShipStatus() === false) {
            computer.computerPlay()
            renderPlayerBoard()
        }

        if (computer.board.checkAllShipStatus() === true) {
            alert('a winner is you')
        }

        if (human.board.checkAllShipStatus() === true) {
            alert('a loser is you')
        }
    }))
}

// square.classList.add('shipStrike')

export function renderPlayerBoard() {
    const playerBoardSquare = document.querySelectorAll('.playerBoardSquare');
    playerBoardSquare.forEach(square => {
        // convert the dataset pos into numbers and then make that a variable so that it's easier to handle
        const x = parseInt(square.dataset.pos[0])
        const y = parseInt(square.dataset.pos[2])
        const position = human.board.board[x][y];
        if (position.ship != false) {
            square.classList.add('ship')
        }

        // if ship is hit remove the ship class and add the strike class
        if (position.hit === true) {
            square.classList.remove('ship')
            square.classList.add('shipStrike')
        }

        if (position.missedShot === true) {
            square.classList.add('missedShot')
        }
    })
}

export function renderComputerBoard() {
    const computerBoardSquare = document.querySelectorAll('.computerBoardSquare');
    computerBoardSquare.forEach(square => {
        const x = parseInt(square.dataset.pos[0]);
        const y = parseInt(square.dataset.pos[2]);
        const position = computer.board.board[x][y];
        if (position.hit === true) {
            square.classList.add('shipStrike');
        }

        if (position.missedShot === true) {
            square.classList.add('missedShot');
        }
    })
}