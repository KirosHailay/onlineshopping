const path = require('path'),
    { cartService } = require(path.join(__dirname, '..', 'services')),
    { ApiResponse } = require(path.join(__dirname, '..', 'util'))

    exports.getProductById = async(req,res,next) => {
        try{ 
            const response= await cartService.getProductById(req.params.prodId);
            res.status(response.status).send(response);
        } catch (err) {
            console.log(err);
            res.status(500).json(new ApiResponse(500, 'error', err));
        }
    }
    exports.getCart = async (req, res, next) => {
        try {
            const response = await cartService.getCart(req);
            res.status(response.status).json(response);
        } catch (err) {
            console.log(err);
            res.status(500).json(new ApiResponse(500, 'error', err));
        }
    };
    exports.addToCart = async (req, res, next) => {
        try {
            const response = await cartService.addToCart(req);
            res.status(response.status).send(response);
        } catch(err) {
            console.log('the error: ', err)
            res.status(500).send(new ApiResponse(500, 'err', {err}));
        }
    };
    
    exports.removeFromCart = async (req, res, next) => {
        try {
            const response = await cartService.removeFromCart(req);
            res.status(response.status).send(response);
        } catch(err) {
            console.log('the error ', err)
            res.status(500).send(new ApiResponse(500, 'err', {err}));

        }
    }

    // exports.editInCart = async (req, res, next) => {
    //     try {
    //         const response = await cartService.editInCart(req);
    //         res.status(response.status).send(response);
    //     } catch(err) {
    //         console.log('the error ', err)
    //         res.status(500).send(new ApiResponse(500, 'err', {err}));
    //     }
    // }