const ship = (length, x, y) => {
    return {
        length: length,
        hit: Array(length).fill(false),
        sunk: false,
    };
}

module.exports = ship;