import {
    human,
    computer
} from "../index";

const playerBoard = document.querySelector('.playerBoard')
const computerBoard = document.querySelector('.computerBoard')
const carrier = document.querySelector('#carrierPiece');
const battleship = document.querySelector('#battleshipPiece');
const cruiser = document.querySelector('#cruiserPiece');
const submarine = document.querySelector('#submarinePiece');
const destroyer = document.querySelector('#destroyerPiece');

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

// scans each square of the player's board and add a CSS class to that specific square if a ship, a hit, or a missed shot is there. 
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

// scans each square of the computer's board and add a CSS class to that specific square if a hit, or a missed shot is there. 
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

// resets both boards, deletes the boards, and then uses the make board functions above to make new boards
export function clearAndResetBoard() {
    const resetBtn = document.querySelector('#resetBtn');
    const gameOverModal = document.querySelector('.gameOverModal');
    const playerPieces = document.querySelector('.playerPieces');
    resetBtn.addEventListener('click', () => {
        human.board.resetBoard()
        computer.board.resetBoard()
        while (playerBoard.firstChild) playerBoard.removeChild(playerBoard.firstChild);
        while (computerBoard.firstChild) computerBoard.removeChild(computerBoard.firstChild);
        makePlayerBoardDOM();
        makeComputerBoardDOM();
        gameOverModal.style.display = 'none';
        computerBoard.style.display = 'none';
        playerPieces.style.display = 'block';
        carrier.style.display = 'flex';
        battleship.style.display = 'flex';
        cruiser.style.display = 'flex';
        submarine.style.display = 'flex';
        destroyer.style.display = 'flex';
        shipDragEnable.init()
        shipPieceDropped()
    })
}

export const shipDragEnable = (() => {
    const shipDragAddEventListener = (ship) => {
        ship.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.classList)
        })
    }

    const init = () => {
        const carrier = document.querySelector('#carrierPiece');
        const battleship = document.querySelector('#battleshipPiece');
        const cruiser = document.querySelector('#cruiserPiece');
        const submarine = document.querySelector('#submarinePiece');
        const destroyer = document.querySelector('#destroyerPiece');
        shipDragAddEventListener(carrier)
        shipDragAddEventListener(battleship)
        shipDragAddEventListener(cruiser)
        shipDragAddEventListener(submarine)
        shipDragAddEventListener(destroyer)
    }
    return {
        init
    }
})()

export function shipPieceDropped() {
    const playerBoardSquare = document.querySelectorAll('.playerBoardSquare');
    playerBoardSquare.forEach(square => square.addEventListener('dragover', (e) => {
        e.preventDefault()
    }))

    playerBoardSquare.forEach(square => square.addEventListener('drop', (e) => {
        e.preventDefault()
        const data = e.dataTransfer.getData('text');
        console.log(data)
        console.log(square.dataset.pos)
        const x = parseInt(square.dataset.pos[0])
        const y = parseInt(square.dataset.pos[2])
        const position = [x, y]

        switch (true) {
            case data === 'carrierHor' && y <= 3 && human.board.carrierPlaced === false:
                human.board.placeShip(position, 'hor', 'carrier', 5)
                carrier.style.display = 'none'
                renderPlayerBoard()
                enableStartButton()
                break;
            case data === 'battleshipHor' && y <= 4:
                human.board.placeShip(position, 'hor', 'battleship', 4)
                battleship.style.display = 'none'
                renderPlayerBoard()
                enableStartButton()
                break;
            case data === 'cruiserHor' && y <= 5:
                human.board.placeShip(position, 'hor', 'cruiser', 3)
                cruiser.style.display = 'none'
                renderPlayerBoard()
                enableStartButton()
                break;
            case data === 'submarineHor' && y <= 5:
                human.board.placeShip(position, 'hor', 'submarine', 3)
                submarine.style.display = 'none'
                renderPlayerBoard()
                enableStartButton()
                break;
            case data === 'destroyerHor' && y <= 6:
                human.board.placeShip(position, 'hor', 'destroyer', 2)
                destroyer.style.display = 'none'
                renderPlayerBoard()
                enableStartButton()
                break;
        }
    }))
}

export function enableStartButton() {
    const startBtn = document.querySelector('#startBtn');
    if (human.board.checkAllShipsPlaced() === true) {
        console.log('test')
        startBtn.disabled = false;
    }
}