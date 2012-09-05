module.exports.fill = function(val, width, filler) {
    if (!filler) {
        filler = ' ';
    }

    width -= val.toString().length;

    if (width > 0) {
        return new Array(width + (/\./.test(val) ? 2 : 1)).join(filler) + val;
    }

    return val.toString();
};
