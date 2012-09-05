var util = require('util');

var Appender = require('./appender');


/**
 * Build a ConsoleAppender
 *
 * Appends to the console
 */
function ConsoleAppender(name, encoder, layout) {
    this.name = name;
    this.encoder = encoder;
    this.layout = layout;

    this.filters = [];
}


util.inherits(ConsoleAppender, Appender);


ConsoleAppender.prototype.append = function(e) {
    var str = this.layout.doLayout(e);
    var encodedStr = this.encoder.doEncode(str);

    console.log(encodedStr);
};


module.exports = ConsoleAppender;
