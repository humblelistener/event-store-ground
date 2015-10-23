var http = require('http');
var request = require('request');
var randomstring = require('randomstring');
var infiniteLoop = require('infinite-loop');
var console = require('console');
var guid = require('guid');

var id = 0;
var makeCandidate = function(instanceId){
  return {
    firstName: randomstring.generate({
      charset: 'alphabetic',
      length: 6
    }),
    lastName: randomstring.generate({
      charset: 'alphabetic',
      length: 8
    }),
    instanceId: instanceId,
    personId: (id++).toString()
  };
};

var requestOptions = {
  headers: {
    "Content-Type": "application/vnd.eventstore.events+json"
  },
};

var post = function(instanceId){
  var candidateEvent = [ {
    eventId: guid.create(),
    eventType: 'candidate-created',
    data: makeCandidate(instanceId)
  } ];

  requestOptions.url = "http://192.168.99.100:2113/streams/candidate-" + instanceId + "-" + candidateEvent[0].data.personId;
  requestOptions.body = JSON.stringify(candidateEvent);

  request.post(requestOptions, function(err, response){
    if(err) throw err;
    console.log(response.statusCode + JSON.stringify(candidateEvent));
    response.on('data', function(chunk){
      console.log('response is ' + chunk);
    });
  });
};

new infiniteLoop().add(post, 218).run();
