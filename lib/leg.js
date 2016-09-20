var calculators = require('./calculators');
var geomagnetism = require('geomagnetism');

var windCorecctionAngle = calculators.windCorecctionAngle;
var trueHeading = calculators.trueHeading;
var magenticHeading = calculators.magneticHeading;
var groundSpeed = calculators.groundSpeed;
var legTime = calculators.legTime;
var outDir = calculators.outputDirection;


module.exports = Leg;

var variation = geomagnetism.model().point([51.5710, 0.6976]).decl;

function Leg(from, to, track, altitude, tas, wind, distance) {
    // enforces new
    if (!(this instanceof Leg)) {
        return new Leg(from, to, track, altitude, tas, wind, distance);
    }
    this.from = from;
    this.to = to;
    this.track = track || 360;
    this.altitude = altitude || 2000;
    this.tas = tas || 100;
    this.wind = wind || {} ;
    this.distance = distance || 0;
    this.wca = windCorecctionAngle(track, tas, wind);
    this.trueHeading = trueHeading(track, tas, wind);
    this.variation = variation;
    this.magneticHeading = magenticHeading(this.trueHeading, this.variation);
    this.groundSpeed = groundSpeed(track, tas, wind);
    this.legTime = legTime(this.distance, this.groundSpeed);
}
Leg.prototype.output = function() {
    return {
        from: this.from,
        to: this.to,
        altitude: this.altitude,
        tas: this.tas,
        track: outDir(this.track),
        wind: outDir(this.wind.direction) + '/' + this.wind.speed,
        headingT: outDir(this.trueheading),
        headingM: outDir(this.magneticHeading),
        groundspeed: Math.round(this.groundSpeed),
        distance: this.distance,
        time: Math.round(this.legTime)
    };
};


