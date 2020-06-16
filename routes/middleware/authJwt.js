const path = require('path'),
    { ApiResponse, config } = require(path.join(__dirname, '..', '..', 'util')),
    { User } = require(path.join(__dirname, '..', '..', 'models'))
jwt = require('jsonwebtoken');


exports.verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).send(new ApiResponse(403, 'error', { err: 'No Token Provided!' }));
    }
    const token = authHeader.split(' ')[1];


    jwt.verify(token, config.jwtKey, async(err, decoded) => {
        if (err) {
            return res.status(401).send(new ApiResponse(401, 'error', { err: 'Unauthorized!' }));
        }
        const user = await User.findOne({ userName: decoded.data })
        if (user) {
            req.user = user;
        }
        next();
    });
}