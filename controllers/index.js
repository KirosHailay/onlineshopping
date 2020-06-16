const path = require('path'),
    authController = require(path.join(__dirname, 'auth')),
    orderController = require(path.join(__dirname, 'order')),
    userController = require(path.join(__dirname, 'user'));

module.exports = {
    authController,
    orderController,
    userController
}