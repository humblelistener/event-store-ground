fromCategory('candidate')
    .foreachStream()
    .whenAny(function(state, event){
        var personId = event.data.personId;
        emit('candidates-' + event.data.instanceId, event.eventType, { personId: event.data.personId });
        emit('candidates', event.eventType, { personId: event.data.personId, instanceId: event.data.instanceId });
    });
