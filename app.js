
const fs = require("fs");
var array = []

fs.readFile("input.txt", "utf8", 
	function(error,data) {
		if(error) throw error;
		array = data.toString().split("\n");
		for(i in array) {
			console.log(array[i]);
        }
		console.log(">>>> " + array[2])
});


