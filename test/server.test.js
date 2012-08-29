//
// mocha --reporter spec *.js
//
var should = require('should');

var server = require("../server/server");
var http = require('http');
var fs = require('fs');

describe("サーバーサイドのテスト", function() {
	var docRoot = __dirname + "/test.fixtures";

	var s = server.start(8888, docRoot);

	it ("サーバーインスタンスが生成されていること", function() {
		server.should.be.ok;


		s.should.be.ok;
		s.host.should.equal("0.0.0.0")
		s.port.should.equal(8888);

		s.documentRoot.should.equal(docRoot);
		fs.existsSync(s.documentRoot + '/hello.html').should.be.true;
	});

	it ("想定されるレスポンスが返されること", function(defferal) {
		http.get("http://127.0.0.1:8888/hello.html", function(res) {
			res.should.be.ok;
			res.statusCode.should.equal(200);
			res.headers['content-type'].should.equal('text/html; charset=utf-8');
			res.on('data', function(chunk) {
				var expected = fs.readFileSync(s.documentRoot + '/hello.html', "utf-8")

				chunk.toString().should.equal(expected);
			})

			defferal();
		});
	});

	it ("エラーレスポンスが返されること", function(defferal) {
		http.get("http://127.0.0.1:8888/not-exists.html", function(res) {
			res.should.be.ok;
			res.statusCode.should.equal(404);
			res.headers['content-type'].should.equal('text/html; charset=utf-8');
			res.on('data', function(chunk) {
				chunk.toString().should.equal('<h1>Content Not Found</h1>');
			})

			defferal();
		});

	})
});

