/*var fs = require("fs"),
	url = require("url"),
	mime = require("mime"),
	handler = require("./handler.js"),
	hb = require("./hb.js"),*/
var regImage = /image/,
	regVideo = /video/

giveFile = {
	send: function(request,response,filename,callback,servHtml){
		var type = mime.lookup(filename),
			charset = mime.charsets.lookup(type),
			that = this;
		if(!regVideo.test(type)){
			fs.readFile(filename,charset,function(err,file){
				if(err) return console.log(err);
				if(regImage.test(type)){
					that.response(response,file,type,callback);
				}
				else that.response(response,file,type,callback);
			});
		}
		else if(regVideo.test(type)){
			if(servHtml){
				var data = {path: decodeURI(url.parse(request.url).pathname).replace("xroot","")},
					stats = fs.statSync(__dirname + "/../" + data.path),
					total = stats.size,
					range = request.headers.range,
					start = 0,
					end = total - 1,
					chuncksize = (end - start) + 1;
				if(range){
					var positions = range.replace(/bytes=/,"").split("-"),
						start = parseInt(positions[0], 10),
						end = positions[1] ? parseInt(positions[1], 10) : total - 1,
						chuncksize = (end - start) + 1;
				}
				fs.readFile(__dirname + "/../" + data.path, function(err,file){
					response.writeHead(206, {
						"Content-Range": "bytes " + start + "-"+ end + "/" + total,
						"Accept-Ranges": "bytes",
						"Content-Length": chuncksize,
						"Content-Type": type
					});
					response.end(file.slice(start,end+1),"binary");
				});

				// to stream trought html5 video element, uncoment: >
				/*response.writeHead(200,{"Content-Type":"text/html"});
				response.write(hb.standard.video(data));
				response.end();*/
			}
			else this.streamVideo(request,response,filename);
		}
	},
	streamVideo: require("./streamVideo.js"),
	response: function(response,file,type,callback){
		response.writeHead(200,{"Content-Type":type});
		response.write(file);
		response.end(function(){
			if(callback) callback(file);
		});
	}
}

module.exports = giveFile;