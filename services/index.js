const path = require('path'),
    authService = require(path.join(__dirname, 'auth')),
    cartService = require(path.join(__dirname, 'cart')),
    adminService = require(path.join(__dirname, 'admin')),
    orderService = require(path.join(__dirname, 'order')),
    userService = require(path.join(__dirname, 'user'));
module.exports = {
    authService,
    cartService,
    adminService,
    orderService,
    userService
}