
/*var fs = require("fs"),
	url = require("url"),
	path = require("path"),
	mime = require("mime"),
	querystring = require("querystring"),
	hb = require("./hb.js"),
	giveFile = require("./giveFile.js"),
	givePath = require("./givePath.js"),
	giveImage = require("./giveImage.js"),
	download = require("./download.js"),
	config = require("../config.json"),
	formidable = require("formidable"),*/
var regCssroot = /\.cssroot/,
	regVideoxroot = /xroot/,
	pathroot = __dirname + "/../" + config.root;

var handler = {
	router: function(request,response){
		var parsedUrl = url.parse(request.url),
			pathname = decodeURI(parsedUrl.pathname),
			query = querystring.parse(parsedUrl.query),
			filepath = path.join(pathroot, pathname),
			servHtml = false;

		if(regCssroot.test(filepath)) filepath = __dirname + "/../templates/css/" + url.parse(request.url).pathname.replace(regCssroot,".css");
		if(regVideoxroot.test(filepath)) {
			filepath = filepath.replace("xroot","");
			servHtml = true;
		}

		try{ var stat = fs.statSync(filepath); } 
		catch(err){ var stat = false; }

		if(pathname && query.dload){
			download.defaultDest = path.join(pathroot,"downloads");
			query.dload = decodeURI(query.dload);
			query.ddest = decodeURI(query.ddest);
			if(query.ddest == "undefined") query.ddest = "";
			download.get(query.dload, query.ddest, function(){
				var results = JSON.stringify(arguments);
				if(results == "{}") results = "success";
				else results = "error";
				console.log("[handler] download finished: "+results);
				response.writeHead(302, {"Location": "/"});
				response.end(results);
			});
		}
		else if(pathname && pathname != "/" && stat && stat.isFile() && query.sg == "true"){
			giveImage.send(request,response,filepath,parsedUrl,query);
		}
		else if(pathname && pathname != "/" && query.glinfo == "true"){
			giveImage.info(request,response,filepath,parsedUrl);
		}
		else if(pathname && pathname != "/" && query.comp == "true"){
			giveImage.compressed(request,response,pathroot,parsedUrl);
		}
		else if(pathname && pathname != "/" && stat && stat.isFile()){
			giveFile.send(request,response,filepath,false,servHtml);
		}
		else if(pathname == "/"){
			givePath.index(request,response,pathroot);
		}
		else if(stat && stat.isDirectory()){
			givePath.send(request,response,filepath);
		}
		else if(pathname == "/image"){
			response.writeHead(200,{"Content-Type":"text/html"});
			response.write(hb.standard.image());
			response.end();
		}
		else{
			response.writeHead(404,{"Content-Type":"text/html"});
			response.write(hb.standard.nope());
			response.end();
		}
	},
	isFileSync: function(path){
		return fs.statSync(path).isFile();
	},
	isDirectorySync: function(path){
		return fs.statSync(path).isDirectory();
	},
	upload: function(request,response){
		form = new formidable.IncomingForm();
		form.uploadDir = __dirname+"/../uploads";
		form.keepExtensions = true;

		form.parse(request, function(err, fields, files){
			var name = fields.title || files.upload.name;
			console.log("name: "+name);
			fs.rename(files.upload.path, __dirname+"/../uploads/"+name, function(err){ if(err) console.log(err)})
			response.writeHead(302,{"Location": request.url});
			response.end();
		});
	}
}

module.exports = handler;