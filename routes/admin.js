const app = require('express');
const path = require('path');
const router = app.Router(),
    { adminController } = require(path.join(__dirname, '..', 'controllers')),
    {adminAuthorization} = require('./authorization')

router.get('/', adminAuthorization, adminController.getUnapprovedProducts);
router.put('/approveProduct', adminAuthorization, adminController.approveProduct);
router.put('/approveReview', adminAuthorization, adminController.approveReview);
router.get('/unapprovedReviews/:prodId', adminAuthorization, adminController.getUnaprovedReviews);
router.get('/:prodId', adminAuthorization,  adminController.getProductById);
router.get('/getReview/:revId/:prodId', adminAuthorization,  adminController.getReview);

module.exports = router;