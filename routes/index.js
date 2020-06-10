const path = require('path'),
    authRoute = require(path.join(__dirname, 'auth')),
    productRoute = require(path.join(__dirname, 'product')),
    { authJWT } = require(path.join(__dirname, 'middleware'))

module.exports = {
    authRoute,
    productRoute,
    authJWT
}