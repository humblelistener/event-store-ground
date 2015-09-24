# event-store-ground

Project for populating an event store. Randomly generates a candidate with a first name, last name, and id. Can then read those events using either the [node-feedparser](https://github.com/danmactough/node-feedparser) module, or the [ges-client](https://github.com/bmavity/ges-client) client library.

Alternatively, if you don't want to read events with this project, can use the [event-store-poc](https://github.com/davids-pup/event-store-poc) project to read events.

### Running service

For populating the event store, run the command:

'node load.js'

And that will insert randomly generated candidates into your event store

If you wish to read the events as well, run the command:

'node read.js' or 'node gesRead.js'
