var fs=require('fs');
var file = __filename;
//var file = "test.txt";
//var file = "rainbowsky.jpg";

var b64Streamer = require('./base64-streamer.js');
console.log("input file:",file);

/* Test1: stream encode = static encode */
var read = fs.createReadStream(file);
var encode = b64Streamer.Encoder();
var decode = b64Streamer.Decoder();
var readStreamText = "";
read.on('data',function(dat) {
	readStreamText += dat;
});
var encodeText = "";
encode.on('data',function(dat) {
	encodeText += dat;
});
encode.on('end',function(dat) {
	fs.readFile(file,function(err,data) {
		console.log(encodeText == data.toString('base64'),"stream encode == static encode");
	});
	
});
read.pipe(encode);

var decodeStreamText = "";
decode.on('data',function(dat) {
	decodeStreamText += dat;
});
decode.on('end',function() {
	console.log(decodeStreamText == readStreamText,"decodedText = readText");
});
encode.pipe(decode);


