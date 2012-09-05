exports.init = function(wordsFactory, randomFactory) {
	var parrot = function(message) {
		return message;
	};

	var randomNextDefault = function() {
		return Math.Random();
	};

	var doRanNext = function(fn, factor) {
		var n;
		if (typeof(fn) === "function") {
			n = fn();
		}
		else {
			n = randomNextDefault();
		}

		return Math.floor(n * factor) % factor;
	}

	var wordsDefault = function() {
		return ["..."];
	};

	var doTalkChoice = function(wordsFunc, randFunc) {
		var words;
		if (typeof(wordsFunc) === "function") {
			words = wordsFunc();
		}
		else {
			words = wordsDefault();
		}

		var n = doRanNext(randFunc, words.length);

		return words[n];
	};

	var munode = {
		talk: function(message) {
			if ((doRanNext(this.onRandomNext, 2) == 0)) {
				return parrot(message);
			}
			else {
				return doTalkChoice(wordsFactory, this.onRandomNext);
			}
		},

		onRandomNext: randomFactory,
	};

	return munode;
}