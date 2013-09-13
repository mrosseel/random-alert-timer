var play = require('play');

var minutesToMilliseconds = 60000;

var minMins = 12;
var maxMins = 18;

var min = minMins * minutesToMilliseconds;
var max = maxMins * minutesToMilliseconds;

var count = 0;

var fn = function(runFunction) {
	var timeout = Math.round((max-min)*Math.random()+min);
	setTimeout((function() {
		play.sound('./blip.wav');		
	  	count += 1;
	  	console.log('[' + count + '] done, sleeping...');
	  	runFunction(runFunction);
	}), timeout);
}

console.log('Starting random timer, waiting between ' + minMins + ' and ' + maxMins + ' minutes.');
fn(fn);