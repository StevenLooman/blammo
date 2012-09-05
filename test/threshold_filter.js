var blammo = require('..');
var assert = require('assert');


describe('ThresholdFilter', function() {
    describe('#decide()',  function() {
        it('should reply neutral when the log level is high enough', function() {
            var filter = new blammo.ThresholdFilter('TRACE');
            var le = new blammo.LoggingEvent('test', blammo.Levels.DEBUG, 'dummy message');

            var r = filter.decide(le);

            assert.equal(r, blammo.FilterReply.NEUTRAL);
        });

        it('should reply deny when the log level is too low', function() {
            var filter = new blammo.ThresholdFilter('WARN');
            var le = new blammo.LoggingEvent('test', blammo.Levels.DEBUG, 'dummy message');

            var r = filter.decide(le);

            assert.equal(r, blammo.FilterReply.DENY);
        });
    });
});
