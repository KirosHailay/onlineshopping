const express = require('express'),
    router = express.Router(),
    path = require('path'),
    { authController } = require(path.join(__dirname, '..', 'controllers'));

router.post('/signup', authController.signup)
router.post('/signin', authController.signin);

module.exports = router;