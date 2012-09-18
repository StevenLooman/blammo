/**
 * Build the Pattern Layout
 *
 * Possible tokens for the layout:
 *   - %timestamp
 *   - %logger
 *   - %level
 *   - %message
 */
function PatternLayout(pattern) {
    this.layout = this.buildLayoutFunction(pattern);
}


/**
 * Build the layout function
 */
PatternLayout.prototype.buildLayoutFunction = function(pattern) {
    var getToken = function(match, name, offset) {
        return '" + le[\'' + name + '\'] + "';
    };

    var js = 'return "' + pattern.replace(/%(\w+)/g, getToken) + '";';
    return new Function('le', js);
};


PatternLayout.prototype.doLayout = function(le) {
    return this.layout(le);
};


/**
 * Default pattern layout
 */
PatternLayout.default = '%timestamp|%pid|%logger|%level|%message';


module.exports = PatternLayout;
