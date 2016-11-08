'use strict';

module.exports = function(app) {
    app.use('/api/v1/items', require('../api/item'));
};
