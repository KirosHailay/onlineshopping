const path = require('path'),
    { orderService } = require(path.join(__dirname, '..', 'services')),
    { ApiResponse } = require(path.join(__dirname, '..', 'util'));

    exports.placeOrder = async (req, res, next) => {
        try {
            const response = await orderService.placeOrder(req);
            res.status(response.status).send(response);
        } catch(err) {
            res.status(500, 'error', {err: err})
        }
    }