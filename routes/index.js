const path = require('path'),
    authRoute = require(path.join(__dirname, 'auth')),
    orderRoute = require(path.join(__dirname, 'order')),
    userRoute = require(path.join(__dirname, 'user')),
    { authJWT } = require(path.join(__dirname, 'middleware'));

module.exports = {
    authRoute,
    authJWT,
    orderRoute,
    userRoute
}