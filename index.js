var crypto = require("crypto");
var NanoTimer = require("nanotimer");

var includes = [];
var template = [];

var cc = 100;
for(var i = 0; i < cc; i++){
	includes.push("<" + crypto.randomBytes(8).toString('hex') + "/>");
	template.push("<" + crypto.randomBytes(4).toString('hex') + "/>");
}

if(includes.length !== template.length){
	return console.log("includes and templates are not the same length.");
}

console.log("includes/templates length is: " + includes.length);
var timerObject = new NanoTimer();

var StringV8 = function(){
	var stemplate = "";
	for(var i = 0; i < includes.length; i++){
		stemplate += template[i];
		stemplate += includes[i];
	}
	return stemplate;
}

var BufferV8 = function(){
	
	var _l = template[0].length * template.length + includes[0].length * includes.length;
	var btemplate = Buffer.allocUnsafe(_l);
	var index = 0;
	for(var i = 0; i < includes.length; i++){
		btemplate.write(template[i], index);
		index += template[i].length;
		btemplate.write(includes[i], index);
		index += includes[i].length;
	}
	return btemplate;
};

var BufferV8_2 = function(){
	
	var _l = template[0].length * template.length + includes[0].length * includes.length;
	var btemplate = Buffer.alloc(_l);
	var index = 0;
	for(var i = 0; i < includes.length; i++){
		btemplate.write(template[i], index);
		index += template[i].length;
		btemplate.write(includes[i], index);
		index += includes[i].length;
	}
	return btemplate;
};

var __l = template[0].length * template.length + includes[0].length * includes.length;
var _btemplate = Buffer.allocUnsafe(__l);
var BufferV8_3 = function(){
	
	var index = 0;
	for(var i = 0; i < includes.length; i++){
		_btemplate.write(template[i], index);
		index += template[i].length;
		_btemplate.write(includes[i], index);
		index += includes[i].length;
	}
	return _btemplate;
};

var strDiff = timerObject.time(StringV8, '', 'u');
var bDiff = timerObject.time(BufferV8, '', 'u');
var bDiff2 = timerObject.time(BufferV8_2, '', 'u');
var bDiff3 = timerObject.time(BufferV8_3, '', 'u');

var stemplate = StringV8();
var btemplate = BufferV8();

var bufStrValue = btemplate.toString();
if(bufStrValue.length !== stemplate.length){
	return console.log("bufstrvalue is different from template string value: " + bufStrValue.length + ":" + stemplate.length);
}

if(bufStrValue !== stemplate){
	return console.log("buffer is not of the same value as string");
}

console.log(" === ONE SHOT === ");
console.log("string templating time: " + strDiff + " micros.");
console.log("buffer (unsafe) templating time: " + bDiff + " micros.");
console.log("buffer templating time: " + bDiff2 + " micros.");
console.log("buffer (reuse) templating time: " + bDiff3 + " micros.");

//loops
var lc = 25000;

var StringLoop = function(){
	for(var i = 0; i <  lc; i++){
		StringV8();
	}
};

var BufferLoop = function(){
	for(var i = 0; i <  lc; i++){
		BufferV8();
	}
};

var BufferLoop_2 = function(){
	for(var i = 0; i <  lc; i++){
		BufferV8_2();
	}
};

var BufferLoop_3 = function(){
	for(var i = 0; i <  lc; i++){
		BufferV8_3();
	}
};

var lstrDiff = timerObject.time(StringLoop, '', 'u');
var lbDiff = timerObject.time(BufferLoop, '', 'u');
var lbDiff2 = timerObject.time(BufferLoop_2, '', 'u');
var lbDiff3 = timerObject.time(BufferLoop_3, '', 'u');

console.log(" === LOOPS === ");
console.log("loop string templating time: " + lstrDiff + " micros.");
console.log("loop buffer (unsafe) templating time: " + lbDiff + " micros.");
console.log("loop buffer templating time: " + lbDiff2 + " micros.");
console.log("loop buffer (reuse) templating time: " + lbDiff3 + " micros.");

/* dont forget to set content type or it will be bad
res.set('Content-Type', 'text/html');
res.send(new Buffer('<p>some html</p>'));
*/