var util = require('util');
var fs = require('fs');

var Appender = require('./appender');


/**
 * Build a FileAppender
 *
 * Appends to the configured filename
 */
function FileAppender(name, encoder, layout, config) {
    this.name = name;
    this.encoder = encoder;
    this.layout = layout;
    this.filename = config.filename;

    this.filters = [];
}


util.inherits(FileAppender, Appender);


FileAppender.prototype.append = function(e) {
    var str = this.layout.doLayout(e);
    var encodedStr = this.encoder.doEncode(str) + '\n';

    fs.appendFileSync(this.filename, encodedStr);
};


module.exports = FileAppender;
