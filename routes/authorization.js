function sellerAuthorization(req, res, next) {
    if (req.user.role === 'seller') {
        next()
    } else {
        res.status(401).send({ err: 'unauthorized user' });
    }

}

function buyerAuthorization(req, res, next) {
    if (req.user.role === 'buyer') {
        next()
    } else {
        res.status(401).send({ err: 'unauthorized user' });
    }

}

function adminAuthorization(req, res, next) {
    if (req.user.role === 'admin') {
        next()
    } else {
        res.status(401).send({ err: 'unauthorized user' });

    }
}

module.exports = {
    sellerAuthorization,
    buyerAuthorization,
    adminAuthorization
}