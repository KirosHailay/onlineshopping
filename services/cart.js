const
    mongoose = require('mongoose'),
    path = require('path'),
    { ApiResponse } = require(path.join(__dirname, "..", "util")),
    { User, Product } = require(path.join(__dirname, "..", "models"));

// async function addToCart(request) {
//     const response = await request.user.addToCart(request.body.prodId);
//     if(response) {
//         return new ApiResponse(200, 'success', response);
//     }
    
// }
async function addToCart(request) {
    const user  = request.user;
    console.log('user iss .....', user)
    const product = await Product.findById(request.body.prodId);
    if (product) {
        const isExist = user.cart.items.findIndex(objInItems => new String(objInItems.productId).trim() == new String(product._id).trim());

        if (isExist >= 0) {
            user.cart.items[isExist].qty += 1;

        } else {
            user.cart.items.push({ productId: product._id, qty: 1 });
        }
        if (!user.cart.totalPrice) {
            user.cart.totalPrice = 0;
        }
        user.cart.totalPrice += product.price;
        const value = await user.save();
        if( value) {
            return new ApiResponse(200, 'success', {user: value});
        }
       
        
    }
    return new ApiResponse(500, 'error', {err: 'unable to add to the cart'});
}

async function removeFromCart(request) {
    const user = request.user;
    const product = await Product.findById(request.body.prodId);
    if(product) {
        const isExist = user.cart.items.findIndex(objInItems => new String(objInItems.productId).trim() == new String(request.body.prodId).trim());
        if (isExist >= 0) {
            const qty = user.cart.items[isExist].qty;
            const price = qty * product.price;
            user.cart.totalPrice -= price; 
            user.cart.items.splice(isExist, 1);
            const u = await user.save();
            if(u) {
                return new ApiResponse(200, 'success', {user: u});
            }
        }
       
    }
    return new ApiResponse(500, 'error', {err: 'unable to remove from cart'})

}


module.exports = {
    addToCart,
    removeFromCart
}