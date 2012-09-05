var FilterReply = require('./filter_reply');
var Levels = require('./levels');


/**
 * Build a Threshold Filter
 *
 * DENYs all mesasges which are above the configured level
 */
function ThresholdFilter(level) {
    this.level = Levels[level];
}


ThresholdFilter.prototype.decide = function(le) {
    if (this.level > le.levelValue) {
        return FilterReply.DENY;
    }

    return FilterReply.NEUTRAL;
};


module.exports = ThresholdFilter;
