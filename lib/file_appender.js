var fs = require('fs');


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
}


FileAppender.prototype.append = function(e) {
    var str = this.layout.doLayout(e);
    var encodedStr = this.encoder.doEncode(str) + '\n';

    fs.appendFileSync(this.filename, encodedStr);
};


module.exports = FileAppender;
