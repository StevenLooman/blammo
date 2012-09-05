var LoggingEvent = require('./logging_event');
var Levels = require('./levels');


/**
 * Construct a new logger
 */
function Logger(name, parent) {
    this.name   = name;
    this.parent = parent;

    this.appenders = [];
    this.additive  = true;
}


Logger.ROOT_LOGGER_NAME = 'ROOT';


/**
 * Set the new effective level for this Logger
 */
Logger.prototype.setLevel = function(level) {
    this.level = level;
};

/**
 * Get the effective level for this logger
 */
Logger.prototype.getLevel = function() {
    if (this.level === undefined) {
        return this.parent.getLevel();
    }

    return this.level;
};


/**
 * Add an Appender to this Logger
 */
Logger.prototype.addAppender = function(appender) {
    this.appenders.push(appender);
};

/**
 * Detach a (single) Appender from this Logger
 */
Logger.prototype.detachAppender = function(appender) {
    var index = this.appenders.indexOf(appender);
    if (index !== -1) {
        this.appenders.splice(index, 1);
    }
};

/**
 * Get an Appender by name
 */
Logger.prototype.getAppender = function(name) {
    var namedAppenders = this.getNamedAppenders();
    return namedAppenders[name];
};

/**
 * Get the appenders for this Logger
 */
Logger.prototype.getAppenders = function() {
    var namedAppenders = this.getNamedAppenders();
    var appenders = [];

    var name, appender;
    for (name in namedAppenders) {
        if (namedAppenders.hasOwnProperty(name)) {
            appender = namedAppenders[name];
            appenders.push(appender);
        }
    }

    return appenders;
};

/**
 * Get the appenders by name for this Logger
 */
Logger.prototype.getNamedAppenders = function() {
    var appenders = {};

    var p = this;
    var f = function(appender) {
        appenders[appender.name] = appender;
    };
    while (p) {
        p.appenders.forEach(f);

        if (p.additive) {
            p = p.parent;
        } else {
            break;
        }
    }

    return appenders;
};


Logger.prototype.log = function(level, message) {
    if (this.getLevel() > level) {
        return;
    }

    var le = new LoggingEvent(this.name, level, message);

    this.getAppenders().forEach(function(appender) {
        appender.doAppend(le);
    });
};

/**
 * Log a TRACE message
 */
Logger.prototype.trace = function() {
    this.log(Levels.TRACE, arguments);
};

/**
 * Log a DEBUG message
 */
Logger.prototype.debug = function() {
    this.log(Levels.DEBUG, arguments);
};

/*
 * Log a INFO message
 */
Logger.prototype.info = function() {
    this.log(Levels.INFO, arguments);
};

/**
 * Log a WARN message
 */
Logger.prototype.warn = function() {
    this.log(Levels.WARN, arguments);
};

/**
 * Log a ERROR message
 */
Logger.prototype.error = function() {
    this.log(Levels.ERROR, arguments);
};


module.exports = Logger;
