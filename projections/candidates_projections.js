fromCategory('candidate')
    .foreachStream()
    .whenAny(function(state, event){
        emit('candidates-' + event.data.instanceId, event.eventType, event.data);
        emit('candidates', event.eventType, event.data);
    });
