var http = require('http');
var io = require('socket.io');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req, res) {
	var parts = url.parse(req.url, true);
	
	var path = server.documentRoot + parts.path;
	if (fs.existsSync(path)) {
		if (fs.statSync(path).isFile()) {
			res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

			var stream = fs.createReadStream(path);
			stream.pipe(res);

			res.end();

			return;
		}
	}

	// ファイルが無い場合
	res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
	res.write('<h1>Content Not Found</h1>');
	res.end();
});

exports.start = function(port, documentRoot) {
	server.listen(port);
	server.socket = io.listen(server);
	initListenerSocket(server.socket);

	var address = server.address();
	server.host = address.address;
	server.port = address.port;
	server.documentRoot = documentRoot;

	return server;
}

var initListenerSocket = function(socket) {
	socket.on("connection", function(client) {
		client.send({"message": "接続されました"});
	})
}