/*var hb = require("./hb.js"),
	fs = require("fs"),
	gm = require("gm"),
	async = require("async"),
	mime = require("mime"),
	probe = require("probe-image-size")*/
var utilFile = require("./utilFile.js"),
	regxp = {
		image: /image\//
	},
	probe = probeImageSize;

utilFile.evalArray();


var giveImage = {
// Send the html with the script to run the galery;
	send: function(request,response,pathroot,parsedUrl,query,callback){
		var pathname = decodeURI(parsedUrl.pathname);
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write(hb.standard.image());
		response.end();
		if(callback) callback();
	},
// Responds to a xhttp request whith the data about the parent of the image requested;
	info: function(request,response,pathroot,parsedUrl,callback){
		this.genInfo(decodeURI(parsedUrl.pathname),function(data){
			response.writeHead(200,{"Content-Type":"text/plain"});
			response.write(JSON.stringify(data));
			response.end();
		});
	},
//
	genInfo: function(pathname,callback){
		var data = {items: [], actual: {name: "", index: 0}},
			pathnameArray = pathname.split("/"),
			filename = pathnameArray.pop(),
			parentDirectory = pathnameArray.toString().replace(/\,/g,"/"),
			temp = {"items": [
				{
					src: '05.jpg',
					w: 600,
					h: 400
				},
				{
					src: 'https://placekitten.com/1200/900',
					w: 1200,
					h: 900
				}
			]}
		//console.log("> generating image data, vars:\n pathnameArray: "+pathnameArray+";\n filename: "+filename+";\n parentDirectory: "+parentDirectory+";");
		function iterateSize(path,callback){
			//console.log("> interating size:\n path: "+path);
			path = (new String(__dirname).replace("\\my_modules",""))+parentDirectory+"/"+path;
			//console.log(" mod path: "+path);
			var input = fs.createReadStream(path);
			// causing error on name resolving;
			probe(input, function(err,resu){ 
				input.destroy();
				//console.log("> probe data:\n err: "+err+";\n resu: "+resu);
				callback(err,resu);
			});
		}
		fs.readdir(__dirname+"/.."+parentDirectory,function(err,dir){
			if(err) return //console.log(err);
			for(var i = 0; i < dir.length; i++){
				var mimename = mime.lookup(dir[i]);
				if(!regxp.image.test(mimename)){
					dir[i] = undefined;
				}
			}
			dir.clean(undefined);
			async.mapSeries(dir,iterateSize,function(err,results){
				if(err) return //console.log("[ERROR] "+err)
				results.clean(null);
				for(var i = 0; i < results.length; i++){
					data.items[i] = {
						src: dir[i], 
						w: results[i].width, 
						h: results[i].height, 
						title: dir[i]/*,
						// compressed url
						msrc: dir[i]+"?comp=true"*/
					};
				}
				function compare(item){
					return function(a,b){
						if(a[item] < b[item])
							return -1;
						if(a[item] > b[item])
							return 1;
						return 0;
					}
				}
				data.items.sort(compare("src"));
				data.actual.name = filename;
				data.actual.index = dir.indexOf(filename);
				callback(data);
			});
		});
	},
	compressed: function(request,response,pathroot,parsedUrl,callback){
		fs.readFile(pathroot+decodeURI(parsedUrl.pathname),function(err,buf){
			gm(buf)
				.resize(200)
				.toBuffer("jpg",function(err,buffer){
					if(err) console.log(err);
					response.writeHead(200,{"Content-Type":"image/jpg"})
					response.write(buffer)
					response.end();
					if(callback) callback();
				});
		});
	}
}

module.exports = giveImage;