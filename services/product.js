
const { json } = require('body-parser');
const e = require('express');

const path = require('path'),
     { Product, User } = require(path.join(__dirname, '..', 'models')),
     { ApiResponse, config } = require(path.join(__dirname, '..', 'util'))


async function getAllProducts(req){
    if(req.user.role === 'seller'){
        const products = await Product.find({sellerId: req.user._id});
        return new ApiResponse(200, 'success', products);
    } 
    if(req.user.role === 'buyer'){
     const product = await Product.find({approved : true});
     return new ApiResponse(200, 'success', product );
    }
}


async function addProduct(req){
    const body = req.body;
    const product =  await Product.findOne({sellerId : req.user._id,title : body.title});
   
    if(product){
        product.quantity = parseInt(product.quantity) + parseInt(body.quantity);
        await product.save();
        return new ApiResponse(200, 'success',  product);
    }
  else{ 
    const prod = new Product({
        title : body.title,
        imageURL: body.imageURL,
        quantity : body.quantity,
        price : body.price,
        description : body.description,
        sellerId: req.user._id,
        approved : false
       })
    await prod.save();
    return new ApiResponse(200, 'success',  prod );
  }
}


async function getProductById(prodId){
   const product =  await Product.findById(prodId);
    return new ApiResponse(200, 'success', product);
}

async function updateProduct(req){
    const body = req.body;
    console.log("the req body", body)
    const oldProduct =  await Product.findOne({_id: body.id});
    if(oldProduct) {
        console.log("title", oldProduct.title)
        oldProduct.title = body.title;
        oldProduct.imageURL = body.imageURL;
        oldProduct.price = body.price; 
        oldProduct.quantity = body.quantity;
        oldProduct.description = body.description;
        oldProduct.sellerId = req.user._id;
       await oldProduct.save();
       return new ApiResponse(200, 'success', oldProduct);
    }
     
    }


async function deleteProduct(prodId, qty){
    const product = await Product.findById(prodId);
    if(product.quantity > 1 && qty <= parseInt(product.quantity)){
        product.quantity = parseInt(product.quantity) - qty; 
    
        if( product.quantity === 0){
            await Product.deleteOne({_id : prodId});
        }
       else{ await product.save()} 
    }
    else{
    await Product.deleteOne({_id : prodId});
    }
    return new ApiResponse(200, 'success',  product);
}


async function getProductReview(prodId){
    const product =  await Product.findById(prodId);
    return new ApiResponse(200, 'success', product.review);
}


async function addProductReview(req){
    const body = req.body;
    const product =  await Product.find({_id :body._id ,approved:true});
    const newReview = {
       reviewContent: body.reviewContent,
       reviewedBy: req.user._id,
       reviewStatus : false,
       rating : body.rating }
    product.Review.push(newReview);
     await product.save();
    return new ApiResponse(200, 'success', newReview);
}

async function removeProduct(prodId){
    const product =  await Product.deleteOne({_id: prodId});
    return new ApiResponse(200, 'success', product);
}


module.exports = {getAllProducts ,
                  addProduct, 
                  getProductById,
                  updateProduct, 
                  deleteProduct,
                  getProductReview,
                  addProductReview,
                  removeProduct
                };

