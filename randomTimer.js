var play = require('play');

var minutesToMilliseconds = 60000;

var minMins = 12;
var maxMins = 17;

var min = minMins * minutesToMilliseconds;
var max = maxMins * minutesToMilliseconds;

var fn = function(runFunction) {
	var timeout = Math.round((max-min)*Math.random()+min);
	setTimeout((function() {
		play.sound('./blip.wav');		
	  	console.log('sleeping for ' + timeout);
	  	runFunction(runFunction);
	}), timeout);
}

fn(fn);