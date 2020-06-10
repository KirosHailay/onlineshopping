const path = require('path'),
    Product = require(path.join(__dirname, 'product')),
    User = require(path.join(__dirname, 'user'));

module.exports = {
    Product,
    User
}