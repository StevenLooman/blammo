var FilterReply = require('./filter_reply');


function Barrier() {
    this.filters = [];
}


Barrier.prototype.addFilter = function(filter) {
    this.filters.push(filter);
};

Barrier.prototype.passes = function(le) {
    var i;
    var filter, reply;
    for (i = 0; i < this.filters.length; ++i) {
        filter = this.filters[i];
        reply = filter.decide(le);

        if (reply === FilterReply.ACCEPT) {
            return true;
        } else if (reply === FilterReply.DENY) {
            return false;
        }
    }

    return true;
};


module.exports = Barrier;
