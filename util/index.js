const path = require('path'),
    ApiResponse = require(path.join(__dirname, 'response')),
    config = require(path.join(__dirname, 'config'));

module.exports = {
    ApiResponse,
    config
}