var FilterReply = require('./filter_reply');


function Appender() {
}


Appender.prototype.addFilter = function(filter) {
    this.filters.push(filter);
};

Appender.prototype.shouldAppend = function(le) {
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

Appender.prototype.doAppend = function(le) {
    if (!this.shouldAppend(le)) {
        return;
    }

    this.append(le);
};


Appender.prototype.getName = function() {
    return this.name;
};


module.exports = Appender;
