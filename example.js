var blammo = require('./');

function main() {
    var root = blammo.LoggerFactory.getLogger(blammo.Logger.ROOT_LOGGER_NAME);
    var logger1 = blammo.LoggerFactory.getLogger('logger1');
    var logger2 = blammo.LoggerFactory.getLogger('logger2');

    logger1.debug('test debug message');
    logger2.debug('test debug message');

    logger1.error('test error message');
    logger2.error('test error message');
}

main();
