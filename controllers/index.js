const path = require('path'),
    authController = require(path.join(__dirname, 'auth')),
    productController = require(path.join(__dirname, 'product'))

module.exports = {
    authController,
    productController
}