/*var fs = require("fs"),
	mime = require("mime")*/

var utilFile = {
	eval: function(callback){
		fs.readFile("my_modules/toEval.js","utf8",function(err,file){
			if(err) return console.log(err);
			eval(file);
			if(callback) callback(file);
		});
	},
	evalArray: function(callback){
		fs.readFile("my_modules/toEvalArray.js","utf8",function(err,file){
			if(err) return console.log(err);
			eval(file);
			if(callback) callback(file);
		});
	}
}

module.exports = utilFile;