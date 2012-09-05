var should = require('should');

describe("人工無のエンジンのテスト", function() {
	describe("おうむ返しさせる", function() {
		var ranSeed = 0;

		var munode = require("../server/munode").init(
			function() {

			},
			function() {
				return ranSeed++ / 2;
			}
		);

		munode.should.be.ok;
		munode.talk("Hello").should.equal("Hello");
		munode.talk("LOL").should.equal("...");
		munode.talk("World").should.equal("World");
	});
});