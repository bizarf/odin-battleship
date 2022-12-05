import Gameboard from "../gameboard";

const board = new Gameboard();
afterEach(() => {
    board.resetBoard();
});

test('successfully places a few ships horizontally on the board', () => {
    board.placeShip([0, 0], 'hor', 'carrier', 5);
    board.placeShip([2, 4], 'hor', 'cruiser', 3);
    board.placeShip([0, 5], 'hor', 'destroyer', 2);
    expect((board.board[0][0].ship)).toBe('carrier')
    expect((board.board[0][2].ship)).toBe('carrier')
    expect((board.board[0][4].ship)).toBe('carrier')
    expect((board.board[2][4].ship)).toBe('cruiser')
    expect((board.board[2][6].ship)).toBe('cruiser')
    expect((board.board[0][5].ship)).toBe('destroyer')
    expect((board.board[0][6].ship)).toBe('destroyer')
})

test('successfully places a few ships vertically on the board', () => {
    board.placeShip([0, 0], 'vert', 'carrier', 5);
    board.placeShip([5, 0], 'vert', 'destroyer', 2);
    board.placeShip([3, 4], 'vert', 'battleship', 4);
    expect((board.board[0][0].ship)).toBe('carrier')
    expect((board.board[2][0].ship)).toBe('carrier')
    expect((board.board[4][0].ship)).toBe('carrier')
    expect((board.board[5][0].ship)).toBe('destroyer')
    expect((board.board[6][0].ship)).toBe('destroyer')
    expect((board.board[3][4].ship)).toBe('battleship')
    expect((board.board[6][4].ship)).toBe('battleship')
})

test('fails to place a ship horizontally on the board', () => {
    board.placeShip([0, 0], 'hor', 'carrier', 5);
    expect(board.placeShip([0, 2], 'hor', 'destroyer', 2)).toBe(false)
})

test('fails to place a ship vertically on the board', () => {
    board.placeShip([0, 0], 'vert', 'carrier', 5);
    expect(board.placeShip([0, 2], 'vert', 'destroyer', 2)).toBe(false)
})

test('ship takes two hits', () => {
    board.placeShip([0, 0], 'hor', 'carrier', 5);
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 4]);
    expect(board.ships[0].hits).toBe(2);
    expect(board.board[0][0].hit).toBe(true);
    expect(board.board[0][4].hit).toBe(true);
})

test('miss is recorded on the board', () => {
    board.placeShip([0, 0], 'vert', 'destroyer', 2);
    board.receiveAttack([6, 6]);
    expect(board.board[6][6].missedShot).toBe(true);
    expect(board.board[6][6].ship).toBe(false);
    expect(board.board[6][6].hit).toBe(false);
})

test('returns false if the square already has a hit or a missed shot recorded', () => {
    board.placeShip([0, 0], 'hor', 'destroyer', 2);
    board.receiveAttack([0, 0]);
    expect(board.receiveAttack([0, 0])).toBe(false);
})

test('checks and returns true if all boats on the board have been sunk', () => {
    board.placeShip([0, 0], 'vert', 'destroyer', 1);
    board.placeShip([0, 1], 'vert', 'battleship', 1);
    board.placeShip([0, 2], 'vert', 'cruiser', 1);
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 1]);
    board.receiveAttack([0, 2]);
    expect(board.checkAllShipStatus()).toBe(true);
})

test(`checks and returns false if all boats on the board haven't been sunk`, () => {
    board.placeShip([0, 0], 'vert', 'destroyer', 1);
    board.placeShip([0, 1], 'vert', 'battleship', 1);
    board.placeShip([0, 2], 'vert', 'cruiser', 1);
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 1]);
    expect(board.checkAllShipStatus()).toBe(false);
})

test('returns true if all ships have been placed on the board', () => {
    board.placeShipTeamRandomly();
    expect(board.checkAllShipsPlaced()).toBe(true);
})

test('returns false if not all the ships have been placed on the board', () => {
    board.battleshipPlaced = true;
    expect(board.checkAllShipsPlaced()).toBe(false);
})