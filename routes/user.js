const user = require('../models/user');

const express = require('express'),
    router = express.Router(),
    path = require('path'),
    { userController } = require(path.join(__dirname, '..', 'controllers')),
    {buyerAuthorization} = require('./authorization');
    router.post('/add-shipping-address', buyerAuthorization ,userController.addShippingInfo);
    router.post('/add-shipping-info', buyerAuthorization, userController.addBillingInfo);

    module.exports = router;