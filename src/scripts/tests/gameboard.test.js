import Gameboard from "../gameboard";

test('successfully places a few ships horizontally on the board', () => {
    const board = new Gameboard();
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
    const board = new Gameboard();
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
    const board = new Gameboard();
    board.placeShip([0, 0], 'hor', 'carrier', 5);
    expect(board.placeShip([0, 2], 'hor', 'destroyer', 2)).toBe(false)
})

test('fails to place a ship vertically on the board', () => {
    const board = new Gameboard();
    board.placeShip([0, 0], 'vert', 'carrier', 5);
    expect(board.placeShip([0, 2], 'vert', 'destroyer', 2)).toBe(false)
})