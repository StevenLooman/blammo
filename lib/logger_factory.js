var Logger = require('./logger');


function LoggerFactory() {
    throw new Error("No instances thank you");
}


var loggers = {};


/**
 * Get a logger by its name
 *
 * If the logger does not exist, create it
 */
LoggerFactory.getLogger = function(name) {
    if (!loggers[name]) {
        // find parent
        var parent = LoggerFactory.getParent(name);

        // duplicate parent, or duplicate root if no parent found
        var logger = new Logger(name);
        loggers[name] = logger;
        logger.parent = parent;
    }

    return loggers[name];
};


/**
 * Get the first parent/ancestor from a logger by its name
 *
 * Name of the loggers should be in the form of: ancestor.parent.logger...
 */
LoggerFactory.getParent = function(name) {
    var elements = name.split('.');

    var i;
    for (i = 1; i < elements.length; ++i) {
        var parentName = elements.slice(0, -i).join('.');
        if (loggers[parentName]) {
            return loggers[parentName];
        }
    }

    return loggers[Logger.ROOT_LOGGER_NAME];
};


/**
 * Create root logger
 */
LoggerFactory.getLogger(Logger.ROOT_LOGGER_NAME);


module.exports = LoggerFactory;
