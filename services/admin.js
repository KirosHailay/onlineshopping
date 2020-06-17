const product = require('../models/product');

const
mongoose = require('mongoose'),
path = require('path'),
{ ApiResponse, config } = require(path.join(__dirname, '..', 'util')),
{ Product} = require(path.join(__dirname,"..", "models"));


async function getUnapprovedProducts(){
    const products= await Product.find({approved:false});
    return new ApiResponse(200, 'success',  products)
}

async function approveProduct(request){
    const product= await Product.findById(request.body.prodId);
    if(product){
        if(!product.approved){
            product.approved=true;
            const savedProd= await product.save();
            if(savedProd){
                return new ApiResponse(200, 'success', savedProd);
        }
        }
        else{
            return new ApiResponse(500, 'error', {err: 'product is already approved'});
        }
    }
    return new ApiResponse(500, 'error', {err: 'unable to approve'});
}

async function getUnaprovedReviews(prodId){
    const product= await Product.findById(prodId);
    const reviews= product.Review;
    const unaprovedReviews= reviews.filter(review => review.reviewStatus===false);
    return new ApiResponse(200, 'success', unaprovedReviews );

}

async function approveReview(request){
    const product= await Product.findById(request.body.prodId);
    const reviews= product.Review;
    console.log("REVIEWSSSSSSS",reviews)
    const unaprovedReview= reviews.filter(review => review._id.equals(request.body.reviewId));
    const review=unaprovedReview[0];
    review.reviewStatus=true;
    product.Review.forEach(rev=> {
        if(rev._id.equals(request.body.reviewId)){
            rev=review;
        }
    })

    const savedProd= await product.save();
    if(savedProd){
            return new ApiResponse(200, 'success', review );
        }

    return new ApiResponse(500, 'error', {err: 'unable to approve'});

}


module.exports= {getUnapprovedProducts, approveProduct, getUnaprovedReviews, approveReview};