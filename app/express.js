'use strict';

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var config = require('./config');
var morgan = require('morgan');

module.exports = function(app) {
    var env = app.get('env');
    app.set('port', config.port);
    app.use(cors());
    app.use(compression());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    //FIXME: handle this properly in prod
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT, HEAD");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    if ('production' === env) {}

    if ('development' === env || 'test' === env) {
        app.use(morgan('dev'));
        var errorHandler = require('errorhandler');
        app.use(errorHandler()); // Error handler - has to be last
    }
};
