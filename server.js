'use strict';

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (!cluster.isMaster) {
    require('./app');
    return;
}

console.log('Master cluster setting up ' + numCPUs + ' workers...');

for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
}

cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
});

cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
});

//  Log unhandled exceptions.
process.on('uncaughtException', function(err) {
    console.error('Unhandled Exception', err);
});

process.on('unhandledRejection', function(err, promise) {
    console.error('Unhandled Rejection', err);
});
