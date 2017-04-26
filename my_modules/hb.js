var handlebars = require("handlebars"),
	fs = require("fs");
	/*templateAdminLogin = require("../templates/admin/templateAdminLogin.js")*/

// @args: ({name: "something", path: "./"},{anotherName: "outher"})
var temps = [
	{name: "nope", path: "404.handlebars"},
	{name: "index", path: "index.handlebars"},
	{name: "video", path: "video.handlebars"},
	{name: "image", path: "image.handlebars"}
]

var hb = {
	templates: {},
	info: "",
	template: "",
	data: "",
	buildInfo: function(steps){
		var done = "";
		for(var i = 0; i < steps.length; i++){
			done += steps[i];
		}
		this.info = done;
		return done;
	},
	buildTemplate: function(info){
		if(info) this.info = info;
		this.template = handlebars.compile(this.info);
		return this.template;
	},
	buildData: function(object){
		this.data = this.template(object);
		return this.data;
	},
	buildFunctionObsolete: function(temp,data){
		this.data = "";
		this.buildInfo(temp);
		this.buildTemplate();
		this.buildData(data)
		return this.data;
	},
	buildFunction: function(temp,data){
		this.data = "";
		this.buildTemplate(temp);
		this.buildData(data);
		return this.data;
	},
	standard: {
		nope: function(data){
			/*var that = hb;
			that.data = "";
			that.buildInfo(templateAdminLogin);
			that.buildTemplate();
			that.buildData(data);
			return that.data;*/
			return hb.buildFunction(hb.templates.nope,data);
		},
		index: function(data){
			return hb.buildFunction(hb.templates.index,data);
		},
		video: function(data){
			return hb.buildFunction(hb.templates.video,data);
		},
		image: function(data){
			return hb.buildFunction(hb.templates.image,data);
		}
	}
}

var loadTemplates = function(args){
	for(var i = 0, len = args.length; i < len; i++){
		hb.templates[args[i].name] = fs.readFileSync("templates/"+args[i].path,{encoding: "utf-8"});
	}
}
loadTemplates(temps);

module.exports = hb;