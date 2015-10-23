fromCategory('candidate')
    .foreachStream()
    .whenAny(function(state, event){
        linkTo('candidates-' + event.data.instanceId, event);
    });
