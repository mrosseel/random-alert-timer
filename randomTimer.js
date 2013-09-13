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
var totalTime = 0;

// the main function
var fn = function(runFunction) {
	var timeout = Math.round((max-min)*Math.random()+min);
	setTimeout((function() {
		play.sound(soundFile);		
	  	count += 1;
	  	totalTime += timeout;
	  	console.log('[nr ' + count + '] - ' + Math.round(totalTime/minutesToMilliseconds) + ' minutes total, timeout was ' + (timeout/minutesToMilliseconds).toFixed(1) + ' minutes');
	  	runFunction(runFunction);
	}), timeout);
}

// show start time
var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

console.log('Starting random timer (' + datetime + '), waiting between ' + minMins + ' and ' + maxMins + ' minutes.');

// start the recursive loop
fn(fn);