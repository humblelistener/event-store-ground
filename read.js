var FeedParser = require('feedparser')
	, request = require('request');

var parse = function(streamUri){

	var req = request(streamUri);
	var feedparser = new FeedParser();

	req.on('error', function (error) {
		// handle any request errors
		throw error;
	});
	req.on('response', function (res) {
		var stream = this;

		if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

		stream.pipe(feedparser);
	});

	feedparser.on('error', getParserErrorHandler(feedparser));
	feedparser.on('readable', getParserReadable(feedparser));
}

var getParserErrorHandler = function(feedparser){
	return function() {
			feedparser.on('error', function(error) {
			// always handle errors
			throw error;
		});
	};
};

var getParserReadable = function(feedparser){
	return function(){
		feedparser.on('readable', function() {
			// This is where the action is!
			var stream = this
				, meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
				, item;

			while (item = stream.read()) {
				console.log(item);
				count++;
			}
		});
	}
};

parse('http://192.168.99.100:2113/streams/candidates/0/forward/5');
