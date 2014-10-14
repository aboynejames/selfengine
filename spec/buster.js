var fs = require('fs');
var config = module.exports;

config["Tests"] = {
	rootPath: "../",
	tests: ["spec/*-spec.js"],
	environment: "browser",
	sources: ["src/*.js", "src/**/*.js"],
		resources: [{
	path: "/",
	content: fs.readFileSync('src/index.html') }]
	
};
