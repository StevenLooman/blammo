function TestAppender(name) {
    if (name) {
        this.name = name;
    } else {
        this.name = 'TestAppender';
    }

    this.events = [];
}


TestAppender.prototype.getName = function() {
    return this.name;
};


TestAppender.prototype.doAppend = function(e) {
    this.events.push(e);
};


module.exports = TestAppender;
