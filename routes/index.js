const path = require('path'),
    authRoute = require(path.join(__dirname, 'auth')),
    productRoute = require(path.join(__dirname, 'product')),
    { authJWT } = require(path.join(__dirname, 'middleware')),
    cartRoute = require(path.join(__dirname, 'cart')),
    adminRoute = require(path.join(__dirname, 'admin')),
    orderRoute = require(path.join(__dirname, 'order')),
    userRoute = require(path.join(__dirname, 'user')),
    

module.exports = {
    authRoute,
    productRoute,
    authJWT,
    cartRoute,
    adminRoute,
    orderRoute,
    userRoute
}