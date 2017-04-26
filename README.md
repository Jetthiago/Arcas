# Arcas

## Synopsis
Attention! This isn't a Node module but a concept of a Node server that reads a directory struture and gives to the browser user a interface to view videos, images that are displayed on a galery or download outher types of files. This is ment to personal use on a local network.

## Configuration
The ```config.json``` is where some changes can be made, like port, verbose, and wich files will be ingnorated by the server.
### Defaults
```json
{
"port": 8181,
	"root": "",
	"verbose": true,
	"ignore": [
		"my_modules",
		"node_modules",
		"templates",
		"src",
		"Arcas.bat",
		"config.json",
		"index.js",
		"test.js",
		"nodemon.json",
		"package.json",
		"src",
		"!"
	]
}
```
