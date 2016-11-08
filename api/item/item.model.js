'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    info: String,
    active: Boolean
});

module.exports = mongoose.model('Item', ItemSchema);
