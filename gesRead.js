gesClient = require('ges-client');

var connection = gesClient({ host: '192.168.99.100' }),
	stream = 'candidates';

connection.on('connect', function() {

    // connection.readStreamEventsForward(stream, { start: 0, count: 1 }, function(err, readResult) {
    //     if (err) {
	// 		return console.log('Ooops!', err); // connection error or stream does not exist
	// 	}
	// 	console.log(readResult.Events[0]);
	//
	// 	console.log("---------------- Writing data -------------");
    //     console.log(readResult.Events[0].OriginalEvent.Data);
    // });

	var subscription = connection.subscribeToStream(stream);

	subscription.on('event', function(event){
		console.log(event);
	});
});
