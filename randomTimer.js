var play = require('play');
var program = require('commander');

program
	.version('0.1.0')
	.option('-f, --minimumDelay <int>', 'The minimum amount of delay, in minutes (default = 1)')
	.option('-t, --maximumDelay <int>', 'The maximum amount of delay, in minutes (default = 29)')
	.option('-s, --soundFile <string>', 'The location of the sound file (default is blip.wav)')
	.parse(process.argv);

var minutesToMilliseconds = 60000;

// defaults
var minMins = 1;
var maxMins = 29;
var soundFile = './blip.wav';

// override them if present on command line
if(program.minimumDelay) minMins = program.minimumDelay;
if(program.maximumDelay) maxMins = program.maximumDelay;
if(program.soundFile) soundFile = program.soundFile;

// convert to milliseconds
var min = minMins * minutesToMilliseconds;
var max = maxMins * minutesToMilliseconds;

// keep track how many we played the sound
var count = 0;

var fn = function(runFunction) {
	var timeout = Math.round((max-min)*Math.random()+min);
	setTimeout((function() {
		play.sound(soundFile);		
	  	count += 1;
	  	console.log('[' + count + '] done, sleeping...');
	  	runFunction(runFunction);
	}), timeout);
}

console.log('Starting random timer, waiting between ' + minMins + ' and ' + maxMins + ' minutes.');
fn(fn);