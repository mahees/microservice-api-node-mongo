'use strict';

var _ = require('lodash');
var ItemModel = require('./item.model');

// Get list of items
exports.index = function(req, res) {
    ItemModel.find(function(err, items) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(items);
    });
};

// Get a single item
exports.show = function(req, res) {
    ItemModel.findById(req.params.id, function(err, items) {
        if (err) {
            return handleError(res, err);
        }
        if (!items) {
            return res.status(404).send('Not Found');
        }
        return res.json(items);
    });
};

// Creates a new item in the DB.
exports.create = function(req, res) {
    ItemModel.create(req.body, function(err, items) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(items);
    });
};

// Updates an existing item in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    ItemModel.findById(req.params.id, function(err, items) {
        if (err) {
            return handleError(res, err);
        }
        if (!items) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(item, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(items);
        });
    });
};

// Deletes a item from the DB.
exports.destroy = function(req, res) {
    ItemModel.findById(req.params.id, function(err, items) {
        if (err) {
            return handleError(res, err);
        }
        if (!items) {
            return res.status(404).send('Not Found');
        }
        ItemModel.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}
