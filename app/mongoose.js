'use strict';

var config = require('./config');
var mongoose = require('mongoose');

module.exports = function(app) {

    // mongoose.connect(config.mongo.uri, config.mongo.options);
    // mongoose.connection.on('error', function(err) {
    //     console.error('MongoDB connection error: ' + err);
    //     process.exit(-1);
    // });

    var connection = mongoose.connect(config.mongo.uri, config.mongo.options);

    // When successfully connected
    mongoose.connection.on('connected', function() {
        console.log('Mongoose connection open to ' + config.mongo.uri);
    });

    // If the connection throws an error
    mongoose.connection.on('error', function(err) {
        console.log('Mongoose default connection error: ' + err);
        process.exit(-1);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
};
