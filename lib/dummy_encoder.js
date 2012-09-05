/**
 * Build a dummy encoder
 *
 * Does nothing
 */
function DummyEncoder() {
}


DummyEncoder.prototype.doEncode = function(str) {
    return this.encode(str);
};

DummyEncoder.prototype.encode = function(str) {
    return str;
};


module.exports = DummyEncoder;
