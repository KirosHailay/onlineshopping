const app = require('express');
const path = require('path');
const router = app.Router(),
    { adminController } = require(path.join(__dirname, '..', 'controllers')),
    {adminAuthorization} = require('./authorization')

router.get('/', adminAuthorization, adminController.getUnapprovedProducts);
router.put('/approveProduct', adminAuthorization, adminController.approveProduct);
router.put('/approveReview', adminAuthorization, adminController.approveReview);
router.get('/unapprovedReviews/:prodId', adminAuthorization, adminController.getUnaprovedReviews);


module.exports = router;