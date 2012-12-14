var clc = require('cli-color');

var LogLevels = {
    0     : 'ALL',
    ALL   : 0,

    10    : 'TRACE',
    TRACE : 10,

    20    : 'DEBUG',
    DEBUG : 20,

    30    : 'INFO',
    INFO  : 30,

    40    : 'WARN',
    WARN  : 40,

    50    : 'ERROR',
    ERROR : 50,

    60    : 'OFF',
    OFF   : 60,

    _colors : {
        TRACE : clc.white,
        DEBUG : clc.cyan,
        INFO  : clc.green,
        WARN  : clc.yellow,
        ERROR : clc.red,
        OFF   : clc.magenta
    }
};


module.exports = LogLevels;
