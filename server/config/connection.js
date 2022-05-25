const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/refreshr', {});

module.exports = mongoose.connection;
