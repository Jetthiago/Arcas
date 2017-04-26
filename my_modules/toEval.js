Array.prototype.clean = function(deleteValue) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == deleteValue) {         
			this.splice(i, 1);
			i--;
		}
	}
	return this;
};


mime.define({
	"text/css": ["css","cssroot"],
	"video/3gpp": [
		"3gp"
	],
	"video/3gpp2": [
		"3g2"
	],
	"video/h261": [
		"h261"
	],
	"video/h263": [
		"h263"
	],
	"video/h264": [
		"h264"
	],
	"video/jpeg": [
		"jpgv"
	],
	"video/jpm": [
		"jpm",
		"jpgm"
	],
	"video/mj2": [
		"mj2",
		"mjp2"
	],
	"video/mp2t": [
		"ts"
	],
	"video/mp4": [
		"mp4",
		"mp4v",
		"mpg4",
		"mp4xroot",
		"mp4vxroot",
		"mpg4xroot"
	],
	"video/mpeg": [
		"mpeg",
		"mpg",
		"mpe",
		"m1v",
		"m2v",
		"mpegxroot",
		"mpgxroot",
		"mpexroot",
		"m1vxroot",
		"m2vxroot"
	],
	"video/ogg": [
		"ogv"
	],
	"video/quicktime": [
		"qt",
		"mov"
	],
	"video/vnd.dece.hd": [
		"uvh",
		"uvvh"
	],
	"video/vnd.dece.mobile": [
		"uvm",
		"uvvm"
	],
	"video/vnd.dece.pd": [
		"uvp",
		"uvvp"
	],
	"video/vnd.dece.sd": [
		"uvs",
		"uvvs"
	],
	"video/vnd.dece.video": [
		"uvv",
		"uvvv"
	],
	"video/vnd.dvb.file": [
		"dvb"
	],
	"video/vnd.fvt": [
		"fvt"
	],
	"video/vnd.mpegurl": [
		"mxu",
		"m4u"
	],
	"video/vnd.ms-playready.media.pyv": [
		"pyv"
	],
	"video/vnd.uvvu.mp4": [
		"uvu",
		"uvvu"
	],
	"video/vnd.vivo": [
		"viv"
	],
	"video/webm": [
		"webm",
		"webmxroot"
	],
	"video/x-f4v": [
		"f4v"
	],
	"video/x-fli": [
		"fli"
	],
	"video/x-flv": [
		"flv",
		"flvxroot"
	],
	"video/x-m4v": [
		"m4v"
	],
	"video/x-matroska": [
		"mkv",
		"mk3d",
		"mks",
		"mkvxroot",
		"mk3dxroot",
		"mksxroot"
	],
	"video/x-mng": [
		"mng"
	],
	"video/x-ms-asf": [
		"asf",
		"asx"
	],
	"video/x-ms-vob": [
		"vob",
		"vogxroot"
	],
	"video/x-ms-wm": [
		"wm"
	],
	"video/x-ms-wmv": [
		"wmv",
		"wnvxroot"
	],
	"video/x-ms-wmx": [
		"wmx"
	],
	"video/x-ms-wvx": [
		"wvx"
	],
	"video/x-msvideo": [
		"avi",
		"avixroot"
	],
	"video/x-sgi-movie": [
		"movie",
		"moviexroot"
	],
	"video/x-smv": [
		"smv",
		"smvxroot"
	]
});