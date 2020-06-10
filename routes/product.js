const app = require('express');
const path = require('path');
const router = app.Router(),
    { productController } = require(path.join(__dirname, '..', 'controllers')),

    {
        sellerAuthorization

    } = require('./authorization');

// router.get('/', sellerController.getAllProducts);
router.post('/', sellerAuthorization, productController.addProduct);
// router.put('/:prodId', sellerAuthorization, sellerController.updateProductpost);
// router.delete('/:prodId', sellerController.deleteProduct);



module.exports = router;