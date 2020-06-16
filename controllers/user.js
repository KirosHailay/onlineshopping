const path = require('path'),
    { ApiResponse } = require(path.join(__dirname, '..', 'util')),
    {  userService } = require(path.join(__dirname, '..', 'services'));


    exports.addAddress = async (req, res, next) => {
        try {
            const response = await userService.addAddress(req);
            res.status(response.status).send(response)
        } catch(err) {
            console.log(err)
            res.status(500).send(new ApiResponse(500, 'error',{err: err}))
        }
    }

    exports.addShippingInfo = async(req, res, next) => {
        try {
            const response = await userService.addShippingInfo(req);
            res.status(response.status).send(response)
        } catch(err) {
            console.log(err)
            res.status(500).send(new ApiResponse(500, 'error',{err: err}))
        }
    }