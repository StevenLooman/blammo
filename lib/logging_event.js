var Logger = require('./logger');
var Levels = require('./levels');
var utils = require('./utils');


/**
 * Build a LoggingEvent
 *
 * Timestamp is added from current dat in the form of YYYY-MM-DD hh:mm:ss.ms
 */
function LoggingEvent(logger, level, message) {
    this.logger = logger;
    this.levelValue = level;
    this.message = Array.prototype.slice.call(message).join(''); // XXX: HACKetyhack

    this._timestamp = new Date();
    this.timestamp = LoggingEvent.buildTimestampString(this._timestamp);
    this.pid = process.pid;

    this.level = Levels[level];
}



LoggingEvent.buildTimestampString = function(timestamp) {
    var str = '';

    str += timestamp.getFullYear() + '-' + utils.fill(timestamp.getMonth() + 1, 2, '0') + '-' + utils.fill(timestamp.getDate(), 2, '0');
    str += ' ';
    str += utils.fill(timestamp.getHours(), 2, '0') + ':' + utils.fill(timestamp.getMinutes(), 2, '0') + ':' + utils.fill(timestamp.getSeconds(), 2, '0') + '.' + utils.fill(timestamp.getMilliseconds(), 3, '0');

    return str;
};


module.exports = LoggingEvent;
