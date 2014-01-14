var blammo = process.env.JS_COV ? require('../lib-cov') : require('../lib');
var assert = require('assert');

var TestAppender = require('./test_appender');


describe('Logger', function() {
    describe('#trace()',  function() {
        it('should log when the level is low enough', function() {
            var logger = new blammo.Logger('test');
            var appender = new TestAppender();
            logger.addAppender(appender);
            logger.setLevel(blammo.Levels.TRACE);

            logger.trace('test message');

            assert.ok(appender.events.length === 1);
        });

        it('should not log when the level is too high', function() {
            var logger = new blammo.Logger('test');
            var appender = new TestAppender();
            logger.addAppender(appender);
            logger.setLevel(blammo.Levels.OFF);

            logger.trace('test message');

            assert.ok(appender.events.length === 0);
        });
    });

    describe('#debug()',  function() {
        it('should log when the level is low enough', function() {
            var logger = new blammo.Logger('test');
            var appender = new TestAppender();
            logger.addAppender(appender);
            logger.setLevel(blammo.Levels.DEBUG);

            logger.debug('test message');

            assert.ok(appender.events.length === 1);
        });

        it('should not log when the level is too high', function() {
            var logger = new blammo.Logger('test');
            var appender = new TestAppender();
            logger.addAppender(appender);
            logger.setLevel(blammo.Levels.OFF);

            logger.debug('test message');

            assert.ok(appender.events.length === 0);
        });
    });

    describe('#info()',  function() {
        it('should log when the level is low enough', function() {
            var logger = new blammo.Logger('test');
            var appender = new TestAppender();
            logger.addAppender(appender);
            logger.setLevel(blammo.Levels.INFO);

            logger.info('test message');

            assert.ok(appender.events.length === 1);
        });

        it('should not log when the level is too high', function() {
            var logger = new blammo.Logger('test');
            var appender = new TestAppender();
            logger.addAppender(appender);
            logger.setLevel(blammo.Levels.OFF);

            logger.info('test message');

            assert.ok(appender.events.length === 0);
        });
    });

    describe('#warn()',  function() {
        it('should log when the level is low enough', function() {
            var logger = new blammo.Logger('test');
            var appender = new TestAppender();
            logger.addAppender(appender);
            logger.setLevel(blammo.Levels.WARN);

            logger.warn('test message');

            assert.ok(appender.events.length === 1);
        });

        it('should not log when the level is too high', function() {
            var logger = new blammo.Logger('test');
            var appender = new TestAppender();
            logger.addAppender(appender);
            logger.setLevel(blammo.Levels.OFF);

            logger.warn('test message');

            assert.ok(appender.events.length === 0);
        });
    });

    describe('#error()',  function() {
        it('should log when the level is low enough', function() {
            var logger = new blammo.Logger('test');
            var appender = new TestAppender();
            logger.addAppender(appender);
            logger.setLevel(blammo.Levels.ERROR);

            logger.error('test message');

            assert.ok(appender.events.length === 1);
        });

        it('should not log when the level is too high', function() {
            var logger = new blammo.Logger('test');
            var appender = new TestAppender();
            logger.addAppender(appender);
            logger.setLevel(blammo.Levels.OFF);

            logger.error('test message');

            assert.ok(appender.events.length === 0);
        });
    });

    describe('#getAppender()', function() {
        it('should get an added appender by name', function() {
            var logger = new blammo.Logger('test');
            var appender = new TestAppender('test');
            logger.addAppender(appender);

            var r = logger.getAppender('test');
            assert.equal(r.name, appender.name);
        });
    });

    describe('log level inheritance', function() {
        it('should inherit the parents level if no level is set (effective level)', function() {
            var logger1 = new blammo.Logger('a');
            logger1.setLevel(blammo.Levels.WARN);
            var logger2 = new blammo.Logger('a.b');
            logger2.parent = logger1;

            assert.equal(logger2.getLevel(), blammo.Levels.WARN);
        });

        it('should use its own level if it is set', function() {
            var logger1 = new blammo.Logger('a');
            logger1.setLevel(blammo.Levels.WARN);
            var logger2 = new blammo.Logger('a.b');
            logger2.parent = logger1;
            logger2.setLevel(blammo.Levels.ERROR);

            assert.equal(logger2.getLevel(), blammo.Levels.ERROR);
        });
    });


    describe('appender additivity', function() {
        it('should include its parents appenders', function() {
            var appender = new TestAppender('test_appender');
            var logger1 = new blammo.Logger('a');
            logger1.setLevel(blammo.Levels.DEBUG);
            logger1.addAppender(appender);
            var logger2 = new blammo.Logger('a.b');
            logger2.parent = logger1;

            var appenders = logger2.getAppenders();
            assert.ok(appenders.length === 1);
        });

        it('should not include its parents appenders when the logger is not additive', function() {
            var appender = new TestAppender('test_appender');
            var logger1 = new blammo.Logger('a');
            logger1.setLevel(blammo.Levels.DEBUG);
            logger1.addAppender(appender);
            var logger2 = new blammo.Logger('a.b');
            logger2.parent = logger1;
            logger2.additive = false;

            var appenders = logger2.getAppenders();
            assert.ok(appenders.length === 0);
        });
    });

    describe('auto tracing', function() {
        it('should give a TRACE log message on entry', function() {
            function T() {}
            T.prototype.f1 = function(p1, p2) { };
            var t = new T();

            var logger = new blammo.Logger('test');
            var appender = new TestAppender();
            logger.addAppender(appender);
            logger.setLevel(blammo.Levels.TRACE);
            blammo.Logger.traceEntry(logger, t, 'f1');

            t.f1();

            assert.ok(appender.events.length === 1);
            assert.ok(appender.events[0].message === '--> T.f1()');
        });

        it('should give a TRACE log message on exit', function() {
            function T() {}
            T.prototype.f1 = function(p1, p2) { };
            var t = new T();

            var logger = new blammo.Logger('test');
            var appender = new TestAppender();
            logger.addAppender(appender);
            logger.setLevel(blammo.Levels.TRACE);
            blammo.Logger.traceExit(logger, t, 'f1');

            t.f1();

            assert.ok(appender.events.length === 1);
            assert.ok(appender.events[0].message === '<-- T.f1()');
        });

        it('should give a TRACE log message on entry and exit', function() {
            function T() {}
            T.prototype.f1 = function(p1, p2) { };
            var t = new T();

            var logger = new blammo.Logger('test');
            var appender = new TestAppender();
            logger.addAppender(appender);
            logger.setLevel(blammo.Levels.TRACE);
            blammo.Logger.traceEntry(logger, t, 'f1');
            blammo.Logger.traceExit(logger, t, 'f1');

            t.f1();

            assert.ok(appender.events.length === 2);
            assert.ok(appender.events[0].message === '--> T.f1()');
            assert.ok(appender.events[1].message === '<-- T.f1()');
        });
    });
});
