'use strict';

var path = require('path');
var _ = require('lodash');

var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        },
        server: {
            poolSize: 5
        }
    }
};

module.exports = _.merge(
    all,
    require('./environment/' + process.env.NODE_ENV + '.js') || {});
