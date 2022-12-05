import {
    human,
    computer,
    gameLogic
} from "../index";

const playerBoard = document.querySelector('.playerBoard');
const computerBoard = document.querySelector('.computerBoard');
const playerPieces = document.querySelector('#playerPieces');
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

// scans each square of the player's board and add a CSS class to that specific square if a ship, a hit, or a missed shot is there. 
export const renderPlayerBoard = () => {
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
export const renderComputerBoard = () => {
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
const clearAndResetBoard = () => {
    const resetBtn = document.querySelector('#resetBtn');
    const gameOverModal = document.querySelector('.gameOverModal');
    resetBtn.addEventListener('click', () => {
        human.board.resetBoard()
        computer.board.resetBoard()
        while (playerBoard.firstChild) playerBoard.removeChild(playerBoard.firstChild);
        while (computerBoard.firstChild) computerBoard.removeChild(computerBoard.firstChild);
        makePlayerBoardDOM();
        makeComputerBoardDOM();
        gameOverModal.style.display = 'none';
        computerBoard.style.display = 'none';
        playerPieces.style.display = '';
        playerPieces.classList = 'playerPiecesHor';
        carrier.classList = 'carrierHor';
        battleship.classList = 'battleshipHor';
        cruiser.classList = 'cruiserHor';
        submarine.classList = 'submarineHor';
        destroyer.classList = 'destroyerHor';
        carrier.style.display = '';
        battleship.style.display = '';
        cruiser.style.display = '';
        submarine.style.display = '';
        destroyer.style.display = '';
        shipDragEnable.init()
        shipPieceDropped()
    })
}

// handles the transfer of the classname when the piece is dropped on the board
const shipDragEnable = (() => {
    const shipDragAddEventListener = (ship) => {
        ship.addEventListener('dragstart', (e) => {
            console.log(e)
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

// when the piece is dropped we get the classname from the above function. we also get the position from the dataset attribute. both of these pieces of info are then combined for use in the switch statement to ensure the player places their piece within the board, on a valid place, and in the direction that they want. 
const shipPieceDropped = () => {
    const playerBoardSquare = document.querySelectorAll('.playerBoardSquare');
    playerBoardSquare.forEach(square => square.addEventListener('dragleave', (e) => {
        e.preventDefault()
        square.classList.remove('dragHighlight')
    }))

    playerBoardSquare.forEach(square => square.addEventListener('dragover', (e) => {
        e.preventDefault()
        square.classList.add('dragHighlight')
    }))

    playerBoardSquare.forEach(square => square.addEventListener('drop', (e) => {
        e.preventDefault()
        square.classList.remove('dragHighlight')
        const data = e.dataTransfer.getData('text');
        const x = parseInt(square.dataset.pos[0])
        const y = parseInt(square.dataset.pos[2])
        const position = [x, y]

        switch (true) {
            // cases where the ship is horizontal
            case data === 'carrierHor' && y <= 3 && human.board.carrierPlaced === false:
                human.board.placeShip(position, 'hor', 'carrier', 5);
                human.board.carrierPlaced = true;
                carrier.style.display = 'none';
                renderPlayerBoard();
                enableStartButton();
                break;
            case data === 'battleshipHor' && y <= 4:
                human.board.placeShip(position, 'hor', 'battleship', 4);
                human.board.battleshipPlaced = true;
                battleship.style.display = 'none';
                renderPlayerBoard();
                enableStartButton();
                break;
            case data === 'cruiserHor' && y <= 5:
                human.board.placeShip(position, 'hor', 'cruiser', 3);
                human.board.cruiserPlaced = true;
                cruiser.style.display = 'none';
                renderPlayerBoard();
                enableStartButton();
                break;
            case data === 'submarineHor' && y <= 5:
                human.board.placeShip(position, 'hor', 'submarine', 3);
                human.board.submarinePlaced = true;
                submarine.style.display = 'none';
                renderPlayerBoard();
                enableStartButton();
                break;
            case data === 'destroyerHor' && y <= 6:
                human.board.placeShip(position, 'hor', 'destroyer', 2);
                human.board.destroyerPlaced = true;
                destroyer.style.display = 'none';
                renderPlayerBoard();
                enableStartButton();
                break;

                // cases where the ship piece is vertical
            case data === 'carrierVert' && x <= 3 && human.board.carrierPlaced === false:
                human.board.placeShip(position, 'vert', 'carrier', 5);
                human.board.carrierPlaced = true;
                carrier.style.display = 'none';
                renderPlayerBoard();
                enableStartButton();
                break;
            case data === 'battleshipVert' && x <= 4:
                human.board.placeShip(position, 'vert', 'battleship', 4);
                human.board.battleshipPlaced = true;
                battleship.style.display = 'none';
                renderPlayerBoard();
                enableStartButton();
                break;
            case data === 'cruiserVert' && x <= 5:
                human.board.placeShip(position, 'vert', 'cruiser', 3);
                human.board.cruiserPlaced = true;
                cruiser.style.display = 'none';
                renderPlayerBoard();
                enableStartButton();
                break;
            case data === 'submarineVert' && x <= 5:
                human.board.placeShip(position, 'vert', 'submarine', 3);
                human.board.submarinePlaced = true;
                submarine.style.display = 'none';
                renderPlayerBoard();
                enableStartButton();
                break;
            case data === 'destroyerVert' && x <= 6:
                human.board.placeShip(position, 'vert', 'destroyer', 2);
                human.board.destroyerPlaced = true;
                destroyer.style.display = 'none';
                renderPlayerBoard();
                enableStartButton();
                break;
        }
    }))
}

// start game button
const startBtn = () => {
    const startBtn = document.querySelector('#startBtn');
    startBtn.addEventListener('click', () => {
        computer.board.placeShipTeamRandomly();
        playerPieces.style.display = 'none';
        computerBoard.style.display = 'grid';
        gameLogic();
        startBtn.disabled = true;
    });
};

export const enableStartButton = () => {
    const startBtn = document.querySelector('#startBtn');
    if (human.board.checkAllShipsPlaced() === true) {
        startBtn.disabled = false;
    }
}

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
        renderPlayerBoard();
        enableStartButton();
    });
};

const rotatePiecesBtn = () => {
    const rotatePiecesBtn = document.querySelector('#rotatePiecesBtn');
    rotatePiecesBtn.addEventListener('click', () => {
        if (playerPieces.className === 'playerPiecesHor') {
            playerPieces.classList = 'playerPiecesVert';
            carrier.classList = 'carrierVert';
            battleship.classList = 'battleshipVert';
            cruiser.classList = 'cruiserVert';
            submarine.classList = 'submarineVert';
            destroyer.classList = 'destroyerVert';
        } else if (playerPieces.className === 'playerPiecesVert') {
            playerPieces.classList = 'playerPiecesHor';
            carrier.classList = 'carrierHor';
            battleship.classList = 'battleshipHor';
            cruiser.classList = 'cruiserHor';
            submarine.classList = 'submarineHor';
            destroyer.classList = 'destroyerHor';
        };
    });
};

export const domBtnInit = () => {
    playerShipRandomPlacementBtn();
    clearAndResetBoard()
    shipDragEnable.init()
    shipPieceDropped()
    rotatePiecesBtn()
    startBtn()
}