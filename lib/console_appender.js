/**
 * Build a ConsoleAppender
 *
 * Appends to the console
 */
function ConsoleAppender(name, encoder, layout) {
    this.name = name;
    this.encoder = encoder;
    this.layout = layout;
}


ConsoleAppender.prototype.append = function(e) {
    var str = this.layout.doLayout(e);
    var encodedStr = this.encoder.doEncode(str);

    console.log(encodedStr);
};


module.exports = ConsoleAppender;
