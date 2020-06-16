const path = require('path'),
    authService = require(path.join(__dirname, 'auth')),
    productService = require(path.join(__dirname, 'product'))
module.exports = {
    authService, productService
}