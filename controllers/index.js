const path = require('path'),
    authController = require(path.join(__dirname, 'auth')),
    productController = require(path.join(__dirname, 'product')),
    cartController = require(path.join(__dirname, 'cart')),
    adminController= require(path.join(__dirname, 'admin')),
    orderController = require(path.join(__dirname, 'order')),
    userController = require(path.join(__dirname, 'user'));

module.exports = {
    authController,
    productController,
    cartController,
    adminController,
    orderController,
    userController
}