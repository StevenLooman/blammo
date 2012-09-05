var blammo = require('..');
var assert = require('assert');


describe('LevelFilter', function() {
    describe('#decide()',  function() {
        it('should reply neutral when the log level is not equal to the set level', function() {
            var filter = new blammo.LevelFilter(blammo.Levels.TRACE);
            var le = new blammo.LoggingEvent('test', blammo.Levels.DEBUG, 'dummy message');

            var r = filter.decide(le);

            assert.equal(r, blammo.FilterReply.NEUTRAL);
        });

        it('should reply accept when the log level is equal to the set level', function() {
            var filter = new blammo.LevelFilter(blammo.Levels.WARN);
            var le = new blammo.LoggingEvent('test', blammo.Levels.WARN, 'dummy message');

            var r = filter.decide(le);

            assert.equal(r, blammo.FilterReply.ACCEPT);
        });
    });
});
