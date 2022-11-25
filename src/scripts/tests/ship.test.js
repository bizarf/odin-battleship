import Ship from '../ship';

const carrier = new Ship('carrier', 5);

test('checks if the hit function increases the hit counts', () => {
    expect(carrier.hit()).toBe(1);
    expect(carrier.hit()).toBe(2);
    expect(carrier.hit()).toBe(3);
    expect(carrier.hit()).toBe(4);
});

test('returns true as the ship has been sunk', () => {
    carrier.hits = 5;
    expect(carrier.isSunk()).toBe(true);
});

test(`returns false as the ship hasn't been sunk`, () => {
    carrier.hits = 3;
    expect(carrier.isSunk()).toBe(false);
});