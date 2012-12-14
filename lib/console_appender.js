var levels = require('./levels');

/**
 * Build a ConsoleAppender
 *
 * Appends to the console
 */
function ConsoleAppender(name, encoder, layout, config) {
    this.name = name;
    this.encoder = encoder;
    this.layout = layout;
    this.colorize = config.colorize;
}


ConsoleAppender.prototype.append = function(e) {
    var str = this.layout.doLayout(e);
    var encodedStr = this.encoder.doEncode(str);

    if (this.colorize) {
        var colorFunc = levels._colors[e.level];
        encodedStr = colorFunc(encodedStr);
    }

    console.log(encodedStr);
};


module.exports = ConsoleAppender;
