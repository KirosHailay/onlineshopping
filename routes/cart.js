const app = require('express'), path = require('path'),
    router = app.Router(),
    { cartController } = require(path.join(__dirname, '..', 'controllers')),
    {
        buyerAuthorization

    } = require('./authorization');


router.get('/', buyerAuthorization, cartController.getCart);

router.post('/add-to-cart', buyerAuthorization, cartController.addToCart);

router.post('/remove-from-cart', buyerAuthorization, cartController.removeFromCart);

// router. put('/edit-cart', buyerAuthorization, cartController.editInCart);

module.exports= router;