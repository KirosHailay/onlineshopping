const user = require('../models/user');

const express = require('express'),
    router = express.Router(),
    path = require('path'),
    { userController } = require(path.join(__dirname, '..', 'controllers')),
    {buyerAuthorization} = require('./authorization');
    router.post('/add-shipping-address', buyerAuthorization ,userController.addAddress);
    router.post('/add-shipping-info', buyerAuthorization, userController.addShippingInfo);

    module.exports = router;