exports.init = function() {
	var parrot = function(message) {
		return message;
	}

	var munode = {
		talk: function(message) {
			return parrot(message);
		}
	};

	return munode;
}