const path = require('path'),
    orderService = require(path.join(__dirname, 'order')),
    authService = require(path.join(__dirname, 'auth')),
    userService = require(path.join(__dirname, 'user'));
module.exports = {
    authService,
    orderService,
    userService
    
}