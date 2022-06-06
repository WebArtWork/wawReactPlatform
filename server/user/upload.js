const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { uploadsFolder } = require('./config');

module.exports = function initMiddlewares(app) {
    app.use(cors());
    app.use('/uploads', express.static(uploadsFolder ));
    app.use('/', routes);
}
