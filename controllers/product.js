const path = require('path'),
    { sellerService } = require(path.join(__dirname, '..', 'services')),
    { ApiResponse } = require(path.join(__dirname, '..', 'util'))

exports.getProduct = async(req, res, next) => {
    try {
        const response = await sellerService.getProduct(req.params.prodId);
        res.status(response.status).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }

}

exports.addProduct = (req, res, next) => {
    console.log('here we goo....', req.body);

    res.send('hell')
}


// it goes the same like this