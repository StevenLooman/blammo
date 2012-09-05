var blammo = require('..');
var assert = require('assert');

var TestAppender = require('./test_appender');


describe('PatternLayout', function() {
    describe('doLayout()',  function() {
        it('should layout an acceptable layout', function() {
            var layout = new blammo.PatternLayout('%timestamp|%logger|%level|%message');
            var le = new blammo.LoggingEvent('blammo', blammo.Levels.TRACE, 'test message');

            var result = layout.doLayout(le);
            assert.ok(result.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}\|blammo\|TRACE\|test message/));
        });

        it('should layout timestamp', function() {
            var layout = new blammo.PatternLayout('%timestamp');
            var le = new blammo.LoggingEvent('blammo', blammo.Levels.TRACE, 'test message');

            var result = layout.doLayout(le);
            assert.ok(result.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}/));
        });

        it('should layout pid', function() {
            var layout = new blammo.PatternLayout('%pid');
            var le = new blammo.LoggingEvent('blammo', blammo.Levels.TRACE, 'test message');

            var result = layout.doLayout(le);
            assert.ok(result.match(/\d+/));
        });

        it('should layout level', function() {
            var layout = new blammo.PatternLayout('%level');
            var le = new blammo.LoggingEvent('blammo', blammo.Levels.TRACE, 'test message');

            var result = layout.doLayout(le);
            assert.equal(result, 'TRACE');
        });

        it('should layout messages', function() {
            var layout = new blammo.PatternLayout('%message');
            var le = new blammo.LoggingEvent('blammo', blammo.Levels.TRACE, 'test message');

            var result = layout.doLayout(le);
            assert.equal(result, 'test message');
        });

        it('should layout logger', function() {
            var layout = new blammo.PatternLayout('%logger');
            var le = new blammo.LoggingEvent('blammo', blammo.Levels.TRACE, 'test message');

            var result = layout.doLayout(le);
            assert.equal(result, 'blammo');
        });
    });
});
