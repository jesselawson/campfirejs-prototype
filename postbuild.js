// Don't modify this file directly.
// This is a simple tool to stick a banner at the top of the minified output, which includes the name of the project, the author, and the most recent tag.

var details = "CampfireJS by Jesse Lawson"
const file = "dist/campfire.min.js"

var fs = require('fs'),
ERROR_EMPTY = 'could not be empty';
var currentTag = ""

fs.readFile('VERSION', 'utf8', function(err, contents) {
    currentTag = contents
});

fs.readFile(file, 'utf8', function(error, result) {
    if (error && error.code !== 'ENOENT') {
        console.log("Error doing postbuild.")
    } else {
        if (result)
        var banner = "/* "+details+" ("+currentTag.trim()+") */"
            banner = banner + result;
        
        fs.writeFile(file, banner, function(error){ if(error){console.log("Error writing to built file.")}});
    }
});
