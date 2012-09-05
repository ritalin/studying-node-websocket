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

	var munode = {
		talk: function(message) {
			if ((doRanNext(this.onRandomNext, 2) == 0)) {
				return parrot(message);
			}
			else {
				return "...";
			}
		},

		onRandomNext: randomFactory,
	};

	return munode;
}