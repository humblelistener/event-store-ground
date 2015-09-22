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

	feedparser.on('error', parserErrorHandler);
	feedparser.on('readable', parserReadable);
}

var parserErrorHandler = function(error) {
	// always handle errors
	throw error;
};

var parserReadable = function(){
	// This is where the action is!
	var stream = this
		, meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
		, item;

	while (item = stream.read()) {
		console.log(item);
	}

	// if(readToEnd && meta && meta['atom:link'])
};

var readToEnd = process.Env.READTOEND;

parse('http://192.168.99.100:2113/streams/candidates/0/forward/5');
