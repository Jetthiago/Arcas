/*var fs = require("fs"),
	url = require("url"),
	mime = require("mime"),
	async = require("async"),
	hb = require("./hb.js"),
	config = require("../config.json"),*/
var utilFile = require("./utilFile.js"),
	regVideo = /video/,
	regImage = /image/;

utilFile.eval();

var givePath = {

// Response with a html listing all the files on the index path;
	index: function(request,response,pathroot){
		this.analyseDir(pathroot,request,function(data){
			response.writeHead(200,{"Content-Type":"text/html"});
			response.write(hb.standard.index(data));
			response.end();
		});
	},

// Response with a html listing all the files on the requested directory;
	send: function(request,response,path){
		this.analyseDir(path,request,function(data){
			response.writeHead(200,{"Content-Type":"text/html"});
			response.write(hb.standard.index(data));
			response.end();
		});
	},

// Async method that returns to the callback a object with info about given path;
	analyseDir: function(path,request,callback){
		// set the requested path to a public object avaliable to another method;
		this.actualPath = decodeURI(url.parse(request.url).pathname);
		// initialise the data object to be populated and then returned
		var data = {title: "", pathname: this.actualPath, parents: [], dir: []},
			that = this;
		// read all the files and directories on a given path;
		fs.readdir(path,function(err,dir){
			if(err) return //console.log(err);
			var dirRoot = [];
			// loop to delete forbiden paths on dir;
			for(var dirIndex = 0; dirIndex < dir.length; dirIndex++){
				// if the name of a file or directory is set to be ignorated on the "config.json" file then delete it from the array;
				var ignoreIndex = 0, ignoreLength = config.ignore.length 
				for(; ignoreIndex < ignoreLength; ignoreIndex++){
					// comparassion between the dir array and the ignore array;
					if(dir[dirIndex] == config.ignore[ignoreIndex])
						break
				}
				// detects if the above loop ended before the count was completed;
				if(ignoreIndex == ignoreLength) dirRoot[dirIndex] = path +"/"+ dir[dirIndex];
				else dir[dirIndex] = undefined;
			}
			// clean the empty espaces on the arrays;
			dirRoot = dirRoot.clean(undefined);
			dir = dir.clean(undefined);
			// set of functions to iterate with the generated arrays;
			var funcs = [
				// check every element to see if it is a file or a directory;
				function(callback){
					async.mapSeries(dirRoot,fs.stat,function(err,resusts){
						/*console.log("dir: "+dir);
						console.log("resusts: "+JSON.stringify(resusts))*/
						for(var i = 0; i < resusts.length; i++){
							var classe = "directory";
							if(resusts[i].isFile()) classe = "file";
							data.dir[i] = {class: classe};
						}
						callback(null,resusts);
					});
				},
				// creates a object for every dir item with a path for it and a name to show;
				function(callback){
					async.mapSeries(dir,that.genInfo,function(err,resusts){
						callback(null,resusts);
					});
				}
			];

			// calls the arrays of functions above asynchronously on a serie;
			async.series(funcs,function(err,resusts){
				// at the end populate the "data.dir" array (and checks if any of these files are a video;
				for(var i = 0; i < data.dir.length; i++){
					data.dir[i].name = resusts[1][i].name;
					data.dir[i].path = resusts[1][i].path;
					// the new stream method does not need the video exception;
					//if(regVideo.test(mime.lookup(resusts[1][i].path))) data.dir[i].path = resusts[1][i].path + "xroot";
				}
				// provide the parents paths to the data file, with each directory to the requested;
				function provParents(pathname){
					if(pathname != "/") {
						var pathConcat = "",
							paths = [];
						pathname = pathname.split("/");
						pathname.shift();
						for (var i = 0; i < pathname.length; i++) {
							pathConcat += "/"+pathname[i];
							paths[i] = {path: pathConcat, name: "/"+pathname[i]}
						}
						return paths;
					}
					else{
						return [{path: "", name: "/"}]
					}
				}
				// comparison method that returns a function given which iten needs to be sorted;
				function compare(item){
					return function(a,b){
						if(a[item] < b[item])
							return -1;
						if(a[item] > b[item])
							return 1;
						return 0;
					}
				}
				var hasDir = false, files = [], dirs = [], idk = [];
				for(var i = 0; i < data.dir.length; i++){
					if(data.dir[i].class == "file"){
						files[files.length] = data.dir[i];
					} else if(data.dir[i].class == "directory") {
						hasDir = true;
						dirs[dirs.length] = data.dir[i];
					} else {
						idk[idk.length] = data.dir[i];
					}
				}
				// sort the dir array;
				files.sort(compare("name"));
				dirs.sort(compare("name"));
				data.dir = dirs.concat(files).concat(idk);
				// old lazy method↓
				//data.dir.sort(compare("name"));
				//if(hasDir) data.dir.sort(compare("class"));
				data.parents = provParents(that.actualPath);
				data.title = data.parents[data.parents.length - 1].name.replace("/","");
				if(data.title == "") data.title = "Index";
				/*console.log("data to render: "+JSON.stringify(data,undefined,2))*/
				that.imageIndex = 0;
				if(callback) callback(data);
			});
		});
	},

// Method return a function to iteratee with a array at the async methods on the "analyseDir" function;
	genInfo: function(path,callback){
		var obj = {path: givePath.actualPath+"/"+path, name: path};
		if(regImage.test(mime.lookup(path)))
			var obj = {path: givePath.actualPath+"/"+path+"?sg=true&in="+givePath.imageIndex++, name: path};

		if(givePath.actualPath == "/") var obj = {path: givePath.actualPath+path, name: path};
		callback(null, obj);
	},
	actualPath: null,
	imageIndex: 0

}

module.exports = givePath;