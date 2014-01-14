var blammo = process.env.JS_COV ? require('../lib-cov') : require('../lib');
var assert = require('assert');

describe('Barrier', function() {
    describe('#passes()',  function() {
        it('should pass when it has no filters', function() {
            var barrier = new blammo.Barrier();

            assert.ok(barrier.passes());
        });

        it('should pass when a filter ACCEPTs it', function() {
            var barrier = new blammo.Barrier();
            var filter = new blammo.LevelFilter('TRACE');
            barrier.addFilter(filter);

            var le = new blammo.LoggingEvent('test', blammo.Levels.TRACE, 'dummy message');
            var r = barrier.passes(le);

            assert.ok(r);
        });

        it('should pass when a filter NEUTRALs it', function() {
            var barrier = new blammo.Barrier();
            var filter = new blammo.LevelFilter('TRACE');
            barrier.addFilter(filter);

            var le = new blammo.LoggingEvent('test', blammo.Levels.DEBUG, 'dummy message');
            var r = barrier.passes(le);

            assert.ok(r);
        });

        it('should not pass when filter DENYs it', function() {
            var barrier = new blammo.Barrier();
            var filter = new blammo.ThresholdFilter('WARN');
            barrier.addFilter(filter);

            var le = new blammo.LoggingEvent('test', blammo.Levels.DEBUG, 'dummy message');
            var r = barrier.passes(le);

            assert.ok(!r);
        });
    });
});
