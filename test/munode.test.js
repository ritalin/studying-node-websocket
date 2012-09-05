var should = require('should');

describe("人工無のエンジンのテスト", function() {
	it("おうむ返しさせる", function() {
		var ranSeed = 0;

		var munode = require("../server/munode").init(
			null,
			function() {
				return ranSeed++;
			}
		);

		munode.should.be.ok;
		munode.talk("Hello").should.equal("Hello");
		munode.talk("LOL").should.equal("LOL");
		munode.talk("World").should.equal("World");
		munode.talk("LOL").should.equal("LOL");
	});

	it("2回に一回沈黙", function() {
		var ranSeed = 0;

		var munode = require("../server/munode").init(
			null,
			function() {
				var n = ranSeed++ % 3;

				if (n < 2) {
					return n / 2;
				}
				else {
					return 0;
				}
			}
		);

		munode.should.be.ok;
		munode.talk("Hello").should.equal("Hello");
		munode.talk("LOL").should.equal("...");
		munode.talk("World").should.equal("World");
		munode.talk("LOL").should.equal("...");
	});

	it ("2回に一回指定ワードから選択", function() {
		var ranSeed = 0;

		var wordSeed = 0;
		var words = ["foo", "bar", "baz", "fiz", "uge"];
		var munode = require("../server/munode").init(
			function() {
				return words;
			},
			function() {
				var n = ranSeed++ % 3;

				if (n < 2) {
					return n / 2;
				}
				else {
					return wordSeed++ % words.length / words.length;
				}
			}
		);

		munode.should.be.ok;
		munode.talk("Hello").should.equal("Hello");
		munode.talk("LOL").should.equal("foo");
		munode.talk("World").should.equal("World");
		munode.talk("LOL").should.equal("bar");
		munode.talk("Wryyyy").should.equal("Wryyyy");
		munode.talk("LOL").should.equal("baz");
	});
});