const path = require('path'),
    Product = require(path.join(__dirname, 'product')),
    User = require(path.join(__dirname, 'user')),
    Order = require(path.join(__dirname, 'order'));

module.exports = {
    Product,
    User,
    Order
}