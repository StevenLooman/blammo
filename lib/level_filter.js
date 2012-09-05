var FilterReply = require('./filter_reply');
var Levels = require('./levels');


/**
 * Build a Level Filter
 *
 * ACCEPTs any log message which is of the configured level
 */
function LevelFilter(level) {
    if (typeof(level) === 'number') {
        this.level = level;
    } else {
        this.level = Levels[level.toUpperCase()];
    }
}


LevelFilter.prototype.decide = function(le) {
    if (this.level === le.levelValue) {
        return FilterReply.ACCEPT;
    }

    return FilterReply.NEUTRAL;
};


module.exports = LevelFilter;
