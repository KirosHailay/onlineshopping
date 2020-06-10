const path = require('path'),
    { ApiResponse } = require(path.join(__dirname, '..', 'util')),
    { authService } = require(path.join(__dirname, '..', 'services'));

exports.signin = async(req, res, next) => {
    try {
        const response = await authService.signin(req.body);
        return res.status(response.status).send(response)

    } catch (err) {
        console.log('err' + err)
        res.status(500).send(new ApiResponse(500, 'error', err));
    }
}

exports.signup = async(req, res, next) => {
    try {
        let response = await authService.signup(req.body);

        res.status(response.status).json(response);
    } catch (err) {
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}