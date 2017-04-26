// Writed by Thiago Marques ~jetthiago

/*
https://git-scm.com/docs/gitignore
https://github.com/github/gitignore
*/

global["verbose"] = true;

var console = require("./my_modules/my_console.js"),
	config = require("./config.json"),
	regIpvSix = /\:\:ffff\:/,
	port = config.port;
global["config"] = config;
global["console"] = console;

var moloader = require("moloader");
moloader.verbose = false;
moloader.load("http, https, fs, url, path, util, formidable, dns, os, mime, querystring, gm, async, probe-image-size, moloader")
		.loadDir("./my_modules");

/*var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	dns = require('dns'),
	os = require('os'),
	mime = require('mime'),
	handler = require("./my_modules/handler.js")*/

commander = require("commander");
commander
	.version("1.0.0")
	.option("-p, --port <n>", "Select the port", parseInt)
	.option("-r, --root <value>", "Select the root dir")
	.parse(process.argv);
if(commander.port) port = commander.port;

var server = {
	init: http.createServer(function(request,response){
		var clientIp = request.connection.remoteAddress || 
			request.socket.remoteAddress ||
			request.connection.socket.remoteAddress,
			date = new Date(),
			time = date.getDate()+"/"+date.getMonth()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+","+date.getMilliseconds()+" # "
		clientIp = clientIp.replace(regIpvSix,"");
		console.log(time + "Request for "+decodeURI(request.url)+" from <"+clientIp+">");
		if(request.method.toLowerCase() == "post"){
			handler.upload(request,response);
		} else {
			handler.router(request,response);
		}
	}),
	directory: function(file){
		return __dirname + "/" + arquivo;
	}
}

dns.lookup(os.hostname(), function (err, add, fam) {
	server.init.listen(port,function(){console.init("Arcas online localy at http://"+add+":"+port)});
});



var debug = {
	isFile: function(){
		console.log("my_modules/handler.js is file? "+handler.isFileSync("my_modules/handler.js"));
	},
	mp4Lookup: function(){
		console.log("video mime is: "+mime.lookup("video.mp4"));
	},
	pngLookup: function(){
		console.log("image mime is: "+mime.lookup("image.png"));
	},
	mimeEval: function(){
		console.log("mime lookup of cssroot is: "+mime.lookup("somecss.cssroot"));
	},
	dir: function(){
		console.log("dir root path: ");
	},
	config: function(){
		console.log("config ignore array = "+config.ignore)
	}
}

/*
>image from xhr to dataUrl
	^ http://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
	^ http://jsfiddle.net/handtrix/yvq5y/
	^ https://developer.mozilla.org/en-US/docs/Web/Demos_of_open_web_technologies
	^ https://davidwalsh.name/convert-image-data-uri-javascript
	^ http://stackoverflow.com/questions/934012/get-image-data-in-javascript

> galery api
	^ https://github.com/fengyuanchen/viewerjs
	^ http://photoswipe.com/
	^ http://photoswipe.com/documentation/getting-started.html

> get image size for photoswipe
	^ https://github.com/image-size/image-size
	^ https://github.com/nodeca/probe-image-size
> gm example
var writeStream = fs.createWriteStream('/path/to/my/resized.jpg');
gm('/path/to/my/img.jpg')
.resize('200', '200')
.stream()
.pipe(writeStream);
*/