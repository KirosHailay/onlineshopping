const path = require('path'),
    authController = require(path.join(__dirname, 'auth')),
    productController = require(path.join(__dirname, 'product')),
    cartController = require(path.join(__dirname, 'cart')),
    adminController= require(path.join(__dirname, 'admin'))

module.exports = {
    authController,
    productController,
    cartController,
    adminController
}