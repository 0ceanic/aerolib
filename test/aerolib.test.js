var aerolib = require('../aerolib');

var theWind = new aerolib.wind(30, 10);
var myTas = 100;
var myAlt = 2000;
var myTrip = new aerolib.trip();

// Leg(from, to, track, altitude, tas, wind, distance)

myTrip.addLeg('J28', 'Gravesend', 157, myAlt, myTas, theWind, 12);
myTrip.addLeg('Gravesend', 'Bewl Water', 179, myAlt, myTas, theWind, 21);
myTrip.addLeg('Bewl Water', 'Maidstone', 24, myAlt, myTas, theWind, 13);
myTrip.addLeg('Maidstone', 'Gravesend', 330, myAlt, myTas, theWind, 11);
myTrip.addLeg('Gravesend', 'J28', 337, myAlt, myTas, theWind, 12);
myTrip.tripSummary();
