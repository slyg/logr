var 
        
    schedule   = require('pomelo-schedule'),
    moment     = require('moment'),
    pollerConf = require('./../../conf/poller.json')
;

var 
    period      = pollerConf.period.split(' '),
    periodValue = +period[0], // be sure that type is Number
    periodUnit  = period[1]
;

module.exports = {
    create : function(job){
    
        schedule.scheduleJob(
            {
                start : Date.now() + 3000,
                period : moment.duration(periodValue, periodUnit).asMilliseconds()
            },
            job
        );
    
    }
}