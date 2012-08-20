var http = require('http');

var server = http.createServer(function(req, res) {
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("<h1>さんぷるさーば</h1>");
	res.end();
});

exports.start = function(port) {
	server.listen(port);

	var address = server.address();
	server.host = address.address;
	server.port = address.port;

	return server;
}