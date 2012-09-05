/**
 * JSON layout
 */
function JsonLayout() {
}


/**
 * Copy the 'visible' parts of the LoggingEvent and stringify it
 */
JsonLayout.prototype.doLayout = function(le) {
    var o = {
        timestamp: le.timestamp,
        logger: le.logger,
        level: le.level,
        message: le.message
    };
    return JSON.stringify(o);
};


module.exports = JsonLayout;
