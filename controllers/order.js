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

    exports.changeOrderStatus = async (req, res, next) => {
        try {
            const response =  await orderService.changeOrderStatus(req);
            res.status(response.status).send(response);
        } catch(err) {
            res.status(500, 'error', {err: err});
        }
    }

    exports.cancelOrder = async (req, res, next) => {
        try {
            const response =  await orderService.cancelOrder(req);
            res.status(response.status).send(response);
        } catch(err) {
            res.status(500, 'error', {err: err});
        }
    }

    exports.orderHistory = async (req, res, next) => {
        try {
            const response =  await orderService.orderHistory(req);
            res.status(response.status).send(response);
        } catch(err) {
            res.status(500, 'error', {err: err});
        }
    }

    exports.orders = async (req, res, next) => {
        try {
            const response =  await orderService.orders(req);
            res.status(response.status).send(response);
        } catch(err) {
            res.status(500, 'error', {err: err});
        }
    }