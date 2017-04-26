/*var fs = require("fs"),
	mime = require("mime"),
	url = require("url")*/

var streamVideo = function(request,response,filename){
	var data = {path: decodeURI(url.parse(request.url).pathname).replace("xroot","")},
		type = mime.lookup(filename),
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
}

/*var streamVideo = function(request,response,filename){
	var range = request.headers.range,
		stats = fs.statSync(filename),
		contentType = mime.lookup(filename);
	//console.log(stats)
	if(!range){
		//return response.send(416);
	}
	var positions = range.replace(/bytes=/, "").split("-"),
		start = parseInt(positions[0], 10);
		total = stats.size;
		end = positions[1] ? parseInt(positions[1], 10) : total - 1;
		chunksize = (end - start) + 1;
	response.writeHead(206,{
		"Content-Range": "bytes " + start + "-" + end + "/" + total,
		"Accept-Ranges": "bytes",
		"Content-Length": chunksize,
		"Content-Type": contentType
	})
	var stream = fs.createReadStream(filename,{start: start, end: end})
		.on("open",function(){
			stream.pipe(response);
		}).on("error",function(err){
			response.end(err);
		});
}*/

module.exports = streamVideo;