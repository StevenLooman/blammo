var FilterReply = require('./filter_reply');
var Levels = require('./levels');


/**
 * Build a Threshold Filter
 *
 * DENYs all mesasges which are above the configured level
 */
function ThresholdFilter(level) {
    if (typeof(level) === 'number') {
        this.level = level;
    } else {
        this.level = Levels[level.toUpperCase()];
    }
}


ThresholdFilter.prototype.decide = function(le) {
    if (this.level > le.levelValue) {
        return FilterReply.DENY;
    }

    return FilterReply.NEUTRAL;
};


module.exports = ThresholdFilter;
