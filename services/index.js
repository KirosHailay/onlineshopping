const path = require('path'),
    authService = require(path.join(__dirname, 'auth')),
    cartService = require(path.join(__dirname, 'cart')),
    adminService = require(path.join(__dirname, 'admin'))
module.exports = {
    authService,
    cartService,
    adminService
}