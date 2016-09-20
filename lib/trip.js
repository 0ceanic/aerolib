var Leg = require('./leg');
require('console.table');

module.exports = Trip;

function Trip() {
    // enforces new
    if (!(this instanceof Trip)) {
        return new Trip(legs);
    }
    this.legs = [];
}


Trip.prototype.addLeg = function(from, to, track, altitude, tas, wind, distance) {
    this.legs.push(new Leg(from, to, track, altitude, tas, wind, distance));
};

Trip.prototype.totalTime = function() {
    var _totalTime = 0;
    this.legs.forEach(function(leg, index) {
        _totalTime = _totalTime + leg.legTime;
    });
    return Math.round(_totalTime);
};
Trip.prototype.totalDistance = function() {
    var _totalDistane = 0;
    this.legs.forEach(function(leg, index) {
        _totalDistane = _totalDistane + leg.distance;
    });
    return Math.round(_totalDistane);
};

Trip.prototype.legsTable = function() {
    var _legsTable = [];
    this.legs.forEach(function(leg, index) {
        _legsTable.push(leg.output());
    });
    return _legsTable;
};

Trip.prototype.tripSummary = function() {

    var _origin = this.legs[0].from;
    var _destination = this.legs[this.legs.length - 1].to;

    console.log('Your trip on ' + new Date());
    console.log('From     : ' + _origin);
    console.log('To       : ' + _destination);
    console.log('Duration : ' + this.totalTime() + ' min');
    console.log('Distance : ' + this.totalDistance() + 'nm');
    console.table(this.legsTable());
};

