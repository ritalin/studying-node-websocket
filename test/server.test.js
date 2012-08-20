//
// mocha --reporter spec *.js
//
var server = require("../server/server");

var assert = require('node-assertthat');

describe("サーバーサイドのテスト", function() {
	it ("サーバーインスタンスが生成されていること", function() {
		server.should.be.ok;

		var s = server.start(8888);
		s.should.be.ok;
		s.host.should.equal("0.0.0.0")
		s.port.should.equal(8888);
	});
});
