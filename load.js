var http = require('http');
var request = require('request');
var randomstring = require('randomstring');
var infiniteLoop = require('infinite-loop');
var console = require('console');
var guid = require('guid');

var id = 0;
var makeCandidate = function(){
  return {
    firstName: randomstring.generate({
      charset: 'alphabetic',
      length: 6
    }),
    lastName: randomstring.generate({
      charset: 'alphabetic',
      length: 8
    }),
    id: (id++).toString()
  };
};

var requestOptions = {
  url: "http://127.0.0.1:2113/streams/candidates",
  headers: {
    "Content-Type": "application/vnd.eventstore.events+json"
  },
};

var post = function(){
  var candidateEvent = [ {
    eventId: guid.create(),
    eventType: 'candidate-created',
    data: makeCandidate()
  } ];

  requestOptions.body = JSON.stringify(candidateEvent);

  request.post(requestOptions, function(err, response){
    if(err) throw err;
    console.log(response.statusCode + JSON.stringify(candidateEvent));
    response.on('data', function(chunk){
      console.log('response is ' + chunk);
    });
  });
};

new infiniteLoop().add(post, 500).run();
