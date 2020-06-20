const app = require('express'), path = require('path'), router = app.Router(),
    { orderController } = require(path.join(__dirname, '..', 'controllers')),
    {buyerAuthorization, sellerAuthorization} = require('./authorization');

    router.get('/', sellerAuthorization, orderController.orders)
    router.get('/order-history', buyerAuthorization, orderController.orderHistory),
    router.post('/place-order', buyerAuthorization, orderController.placeOrder);
    router.put('/change-order-status', sellerAuthorization, orderController.changeOrderStatus);
    router.put('/cancel-order', sellerAuthorization, orderController.cancelOrder);
    
    module.exports = router;