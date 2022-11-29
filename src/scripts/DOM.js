import {
    human
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
        console.log(position)
    }))
}

// square.classList.add('shipStrike')

export function renderPlayerShips() {
    const playerBoardSquare = document.querySelectorAll('.playerBoardSquare');
    playerBoardSquare.forEach(square => {
        const x = parseInt(square.dataset.pos[0])
        const y = parseInt(square.dataset.pos[2])
        const position = [x, y]
        if (human.board.board[position[0]][position[1]].ship != false) {
            square.classList.add('ship')
        }
    })
}