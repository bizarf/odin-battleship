class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hits = 0;
    };

    hit() {
        return this.hits += 1;
    };

    isSunk() {
        return (this.length === this.hits) ? true : false;
    };
};

export default Ship;