// Test data

var mongoose = require('mongoose');

module.exports = mongoose.model('test', {
    name: { type: String, default: '' }
});
