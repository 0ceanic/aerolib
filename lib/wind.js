module.exports = Wind;

function Wind(direction, speed) {
    // enforces new
    if (!(this instanceof Wind)) {
        return new Wind(direction, speed);
    }

    this.direction = direction || 0;
    this.speed = speed || 0;
}
