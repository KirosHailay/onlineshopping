const app = require('express'), path = require('path'), router = app.Router(),
    { orderController } = require(path.join(__dirname, '..', 'controllers')),
    {buyerAuthorization} = require('./authorization');

    router.post('/place-order', buyerAuthorization, orderController.placeOrder);
    
    module.exports = router;