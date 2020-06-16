const app = require('express');
const path = require('path');
const router = app.Router(),
    { productController } = require(path.join(__dirname, '..', 'controllers')),
    {sellerAuthorization , buyerAuthorization} = require('./authorization')

router.get('/', sellerAuthorization, productController.getAllProducts);
router.get('/approved-products',buyerAuthorization, productController.getAllProducts )
router.post('/add-product', sellerAuthorization, productController.addProduct);
router.get('/:prodId', sellerAuthorization, productController.getProductById);
router.put('/edit-product',sellerAuthorization, productController.updateProduct);
router.delete('/delete-product/:prodId/:qty', sellerAuthorization, productController.deleteProduct);
router.get('/reviews/:prodId', productController.getProductReview);
router.post('/reviews', buyerAuthorization, productController.addProductReview);

module.exports = router; 