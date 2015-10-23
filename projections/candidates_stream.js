fromCategory('candidates')
    .foreachStream()
    .whenAny(function(state, event){
        linkTo('candidates', event);
    });
