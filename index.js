var 
    uiserver    = require('./assets/uiserver'),
    broadcaster = require('./assets/broadcaster'),
    poller      = require('./assets/poller'),
    scheduler   = require('./assets/scheduler')
;

uiserver.create()
    .then(broadcaster.create)
    .then(poller.create)
    .then(scheduler.create)
;

//require('memwatch').on('stats', console.log);