/*var https = require("https"),
	http = require("http"),
	fs = require("fs")*/
var regSSL = /https/;

function save(response,file,callback){
	response.pipe(file);
	file.on("finish", function(){
		file.close(callback);
	});
}

function getDestFile(dest, pathUrl, response){
	if(!dest){
		var pathUrl = decodeURI(url.parse(pathUrl).pathname);
		pathUrl = pathUrl.split("/");
		pathUrl = pathUrl[pathUrl.length-1];
		var name = pathUrl + "." + mime.extension(response.headers["content-type"]);
		console.log("name: " + name);
		var newDest = download.defaultDest + "/" + name;
	}
	dest = dest || newDest;
	return fs.createWriteStream(dest);
}

var download = {
	get: function(pathUrl, dest, callback){
		if(regSSL.test(pathUrl)){
			var request = https.get(pathUrl, function(response){
				file = getDestFile(dest, pathUrl, response);
				save(response,file,callback);
			}).on("error", function(err){
				fs.unlink(dest);
				if(callback) callback(err.message);
			});
		} else {
			var request = http.get(pathUrl, function(response){
				file = getDestFile(dest, pathUrl, response);
				save(response,file,callback);
			}).on("error", function(err){
				fs.unlink(dest);
				if(callback) callback(err.message);
			});
		}
	},
	defaultDest: "download"
}
module.exports = download;