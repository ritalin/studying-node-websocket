var should = require('should');

describe("人工無のエンジンのテスト", function() {
	describe("おうむ返しさせる", function() {
		var munode = require("../server/munode").init();

		munode.should.be.ok;
		munode.talk("Hello").should.equal("Hello");
		munode.talk("World").should.equal("World");
	});
});