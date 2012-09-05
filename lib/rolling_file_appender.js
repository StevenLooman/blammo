var util = require('util');
var fs = require('fs');

var Appender = require('./appender');
var utils = require('./utils');


function RollingFileAppender(name, encoder, layout, config) {
    this.name = name;
    this.encoder = encoder;
    this.layout = layout;
    this.filename = config.filename;

    this.filters = [];
}


util.inherits(RollingFileAppender, Appender);


RollingFileAppender.prototype.append = function(e) {
    var str        = this.layout.doLayout(e);
    var encodedStr = this.encoder.doEncode(str) + '\n';

    var dateSuffix = e._timestamp.getFullYear() + '-' + utils.fill(e._timestamp.getMonth() + 1, 2, '0') + '-' + utils.fill(e._timestamp.getDate(), 2, '0');
    var filename   = this.filename + '_' + dateSuffix;

    fs.appendFileSync(filename, encodedStr);
};


module.exports = RollingFileAppender;
