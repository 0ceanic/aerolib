module.exports = {
    windCorecctionAngle: windCorecctionAngle,
    trueHeading: trueHeading,
    magneticHeading: magneticHeading,
    groundSpeed: groundSpeed,
    legTime: legTime,
    outputDirection: outputDirection
};

var DIRECTIONS = [
    "N", "NE", "E", "SE", "S", "SW", "W", "NW"
];

function mod(x, m) {
    return (x % m + m) % m;
    //return _mod === 0 ? 360 : _mod; // convert 0deg to 360deg
}

function normalize(angle) {
    _angle = mod(angle, 360);

    return _angle === 0 ? 360 : _angle;
}

function reciprocal(angle) {
    angle = angle || 0;

    return normalize(angle + 180);
}

function outputDirection(direction) {
    direction = normalize(Math.round(direction)) || normalize(0);

    if (direction < 10) {
        return '00' + direction;
    } else if (direction < 100) {
        return '0' + direction;
    } else {
        return direction;
    }
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

function compass(angle) {
    angle = angle || 0;

    var k = DIRECTIONS.length;
    var dir = mod(Math.round((angle / 360) * k), k);

    return DIRECTIONS[dir === 360 ? 0 : dir];
}

function windCorecctionAngle(track, tas, wind) {
        var _awa = track - reciprocal(wind.direction);
        // Sin(WCA) = Wind Speed * Sin(AWA) / TAS
        var SinWca = wind.speed * Math.sin(toRadians(_awa)) / tas;
        if (Math.abs(SinWca) < 1) {
            return toDegrees(Math.asin(SinWca));
    }
}

function trueHeading(track, tas, wind) {
    return track + windCorecctionAngle(track, tas, wind);
}

function magneticHeading(trueHeading, variance) {
    return trueHeading - variance;
}

function groundSpeed(track, tas, wind) {
        var _wca = windCorecctionAngle(track, tas, wind);
        var _awa = track - reciprocal(wind.direction);
        var _gs = tas * Math.cos(toRadians(_wca)) + (wind.speed * Math.cos(toRadians(_awa)));
        return _gs;
}

function legTime(distance, groundspeed) {
    return 60 * (distance / groundspeed);
}







