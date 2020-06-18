const { request } = require('http');

const path = require('path'),
    { adminService } = require(path.join(__dirname, '..', 'services')),
    { ApiResponse } = require(path.join(__dirname, '..', 'util'))

exports.getUnapprovedProducts = async(req, res, next) =>{
    console.log('here');
    try {
        const response = await adminService.getUnapprovedProducts();
        res.status(response.status).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }

}

exports.approveProduct = async(req, res, next) =>{
    try{
        const response= await adminService.approveProduct(req);
        res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }

}

exports.getUnaprovedReviews = async(req, res, next) =>{
    try {
        const response = await adminService.getUnaprovedReviews(req.params.prodId);
        res.status(response.status).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }

}

exports.approveReview = async(req, res, next) =>{
    try{
        const response= await adminService.approveReview(req);
        res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }

}

exports.getProductById = async(req,res,next) => {
    try{ 
        const response= await adminService.getProductById(req.params.prodId);
        res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}


exports.getReview= async(req,res,next) =>{
    try{ 
        const response= await adminService.getReview(req.params.prodId, req.params.revId);
        res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}