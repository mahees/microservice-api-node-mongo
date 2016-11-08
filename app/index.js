'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config');

var app = express();

require('./mongoose')();
require('./express')(app);
require('./routes')(app);

var server = app.listen(app.get('port'), config.ip, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Process ' + process.pid + ' is listening to all incoming requests. App listening at http://%s:%s', host, port);
});

exports = module.exports = app;
