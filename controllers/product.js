const path = require('path'),
    { productService } = require(path.join(__dirname, '..', 'services')),
    { ApiResponse } = require(path.join(__dirname, '..', 'util'))

// exports.getProduct = async(req, res, next) => {
//     try {
//         const response = await sellerService.getProduct(req.params.prodId);
//         res.status(response.status).json(response);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(new ApiResponse(500, 'error', err));
//     }

// }

exports.getAllProducts = async(req, res, next) =>{
    try {
        const response = await productService.getAllProducts(req);
        res.status(response.status).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }

}

exports.addProduct = async(req,res, next) =>{
    try{
        const response = await productService.addProduct(req);
        res.status(response.status).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}

exports.getProductById = async(req,res,next) => {
    try{ 
        const response= await productService.getProductById(req.params.prodId);
        res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}

exports.updateProduct = async(req, res, next) =>{
    try{ 
        const response= await productService.updateProduct(req);
        res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}

exports.deleteProduct = async(req, res, next) =>{
    try{ 
        const response= await productService.deleteProduct(req.params.prodId, req.params.qty);
        res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}

exports.getProductReview = async(req, res, next)=>{
    try{ 
        const response= await productService.getProductReview(req.params.prodId);
        res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}

exports.addProductReview = async(req, res, next)=>{
    try{ 
        const response= await productService.addProductReview(req);
        res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}