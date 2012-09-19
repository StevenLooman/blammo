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

module.exports.substitute = function(obj, func_name, subbed_func_name, new_func) {
    if (obj[subbed_func_name]) {
        throw new Error('Target function name ("' + subbed_function_name + '") already exists');
    }

    obj[subbed_func_name] = obj[func_name];
    obj[func_name] = new_func;
};
