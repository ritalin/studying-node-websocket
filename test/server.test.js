//
// mocha --reporter spec *.js
//
var should = require('should');

var server = require("../server/server");
var http = require('http');


describe("サーバーサイドのテスト", function() {
	it ("サーバーインスタンスが生成されていること", function() {
		server.should.be.ok;

		var s = server.start(8888);
		s.should.be.ok;
		s.host.should.equal("0.0.0.0")
		s.port.should.equal(8888);
	});

	it ("想定されるレスポンスが返されること", function(defferal) {
		var s = server.start(8888);

		http.get("http://127.0.0.1:8888", function(res) {
			res.should.be.ok;
			res.statusCode.should.equal(200);
			res.headers['content-type'].should.equal('text/html');
			res.on('data', function(chunk) {
				chunk.toString().should.equal('<h1>さんぷるさーば</h1>');
			})
			defferal();
		});
	});
});
