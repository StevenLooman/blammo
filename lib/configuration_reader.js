var path      = require('path');
var fs        = require('fs');
var DOMParser = require('xmldom').DOMParser;

var Barrier       = require('./barrier');
var Levels        = require('./levels');
var Logger        = require('./logger');
var LoggerFactory = require('./logger_factory');


var knownAppenders = {
    'console_appender'     : require('./console_appender'),
    'file_appender'        : require('./file_appender'),
    'rolling_file_appender': require('./rolling_file_appender')
};

var knownEncoders = {
    'dummy_encoder': require('./dummy_encoder')
};

var knownLayouts = {
    'dummy_layout'  : require('./dummy_layout'),
    'pattern_layout': require('./pattern_layout'),
    'json_layout'   : require('./json_layout')
};

var knownFilters = {
    'level_filter'    : require('./level_filter'),
    'threshold_filter': require('./threshold_filter')
};


/**
 * Read the confugration file and construct the Appenders/Loggers
 */
function readConfiguration(filename) {
    var xml = fs.readFileSync(filename).toString();
    var doc = new DOMParser().parseFromString(xml);
    var root = doc.firstChild;

    return parseConfiguration(root);
}


function getChildrenByTagName(node, name) {
    var children = [];

    var i;
    var child;
    for (i = 0; i < node.childNodes.length; ++i) {
        child = node.childNodes.item(i);
        if (child.tagName === name) {
            children.push(child);
        }
    }

    return children;
}

function getChildByTagName(node, name) {
    var i;
    var child;
    for (i = 0; i < node.childNodes.length; ++i) {
        child = node.childNodes.item(i);
        if (child.tagName === name) {
            return child;
        }
    }
}


function parseConfiguration(node) {
    var appenderNodes = getChildrenByTagName(node, 'appender');
    var appenders = parseAppenders(appenderNodes);

    var loggerNodes = getChildrenByTagName(node, 'logger');
    var loggers = parseLoggers(loggerNodes, appenders);

    var rootNode = getChildByTagName(node, 'root');
    var root = parseRoot(rootNode, appenders);

    return root;
}


function parseAppenders(appenderNodes) {
    var appenders = {};

    appenderNodes.forEach(function(appenderNode) {
        appender = parseAppender(appenderNode);
        appenders[appender.name] = appender;
    });

    return appenders;
}

function parseAppender(node) {
    var name = node.getAttribute('name');
    var type = node.getAttribute('type');
    var module = node.getAttribute('module');

    // try loading the Appender externally
    if (module) {
        try {
            knownAppenders[module] = require(module);
            type = module;
        } catch(err) {
            console.error('blammo.ConfigurationReader: unable to load module: ' + module);
            throw new Error('blammo.ConfigurationReader: unable to load module: ' + module);
        }
    }


    // build Appender
    var encoderNode = getChildByTagName(node, 'encoder');
    var encoder = parseEncoder(encoderNode);

    var layoutNode = getChildByTagName(node, 'layout');
    var layout = parseLayout(layoutNode);

    var configNode = getChildByTagName(node, 'config');
    var config = {};
    if (configNode) {
        config = parseAppenderConfig(configNode);
    }

    var appender = new knownAppenders[type](name, encoder, layout, config);
    appender.barrier = new Barrier();


    // add filters
    var filtersNode = getChildByTagName(node, 'filters');
    var filters = parseFilters(filtersNode);

    filters.forEach(function(filter) {
        appender.barrier.addFilter(filter);
    });


    return appender;
}

function parseEncoder(node) {
    var type = node.getAttribute('type');

    return new knownEncoders[type]();
}

function parseLayout(node) {
    var type = node.getAttribute('type');
    var pattern = node.textContent;

    return new knownLayouts[type](pattern);
}

function parseFilters(node) {
    if (!node) {
        return [];
    }

    var filterNodes = getChildrenByTagName(node, 'filter');

    var filters = [];
    filterNodes.forEach(function(filterNode) {
        var filter = parseFilter(filterNode);
        filters.push(filter);
    });

    return filters;
}

function parseFilter(node) {
    var type = node.getAttribute('type');
    var param = node.textContent;

    return new knownFilters[type](param);
}

function parseAppenderConfig(node) {
    var config = {};

    var i, child, key, value;
    for (i = 0; i < node.childNodes.length; ++i) {
        child = node.childNodes.item(i);

        key = child.tagName;
        value = child.textContent;

        if (key) {
            config[key] = value;
        }
    }

    return config;
}


function parseLoggers(loggerNodes, appenders) {
    loggerNodes.forEach(function(loggerNode) {
        parseLogger(loggerNode, appenders);
    });
}

function parseLogger(node, appenders) {
    var name = node.getAttribute('name');
    var logger = LoggerFactory.getLogger(name);

    return parseLogger2(logger, node, appenders);
}

function parseRoot(node, appenders) {
    var root = LoggerFactory.getLogger(Logger.ROOT_LOGGER_NAME);

    return parseLogger2(root, node, appenders);
}

function parseLogger2(logger, node, appenders) {
    var levelString = (node.getAttribute('level') || 'debug').toUpperCase();
    var level = Levels[levelString];
    logger.setLevel(level);

    var appenderRefs = getChildrenByTagName(node, 'appender-ref');
    appenderRefs.forEach(function(appenderRefNode) {
        var ref = appenderRefNode.getAttribute('ref');
        var appender = appenders[ref];
        logger.addAppender(appender);
    });

    return logger;
}


function doRead() {
    var configFile = process.env.BLAMMO_CONFIG || 'blammo.xml';
    if (fs.existsSync && fs.existsSync(configFile)) {
        readConfiguration(configFile);
    } else if (path.existsSync(configFile)) { // for Node 0.6
        readConfiguration(configFile);
    }
}

doRead();
