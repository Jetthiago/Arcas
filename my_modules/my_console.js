var my_console = {
	log: function(){
		if(verbose) console.log.apply(this, arguments);
	},
	init: function(){
		if(verbose) console.log.apply(this, arguments);
		else {
			var string = new String(arguments[0]);
			var index = string.indexOf("at http");
			string = string.replace(string.substring(index, (string.length)), "");
			arguments[0] = string;
			console.log.apply(this, arguments);
		}
	}
}


module.exports = my_console;