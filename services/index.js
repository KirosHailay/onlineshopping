const path = require('path'),
    authService = require(path.join(__dirname, 'auth')),
    cartService = require(path.join(__dirname, 'cart'))
module.exports = {
    authService,
    cartService
}