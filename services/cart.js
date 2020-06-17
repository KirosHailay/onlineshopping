
const
mongoose = require('mongoose'),
path = require('path'),
{ ApiResponse, config } = require(path.join(__dirname, '..', 'util')),
{User, Product} = require(path.join(__dirname,"..", "models"));



async function getCart(request) {
    const user= request.user;
    // console.log("user.."+ user);
    const cart= user.cart;
    console.log("This is the cart.."+ cart);
    return new ApiResponse(200, 'success', cart)
} 


async function addToCart(request) {
    const user  = request.user;
    const cart = user.cart;
    const product = await Product.findById(request.body.prodId);
    if (product) {
        console.log('here')
        const exists = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() == new String(product._id).trim());

        if (exists >= 0) {
            cart.items[exists].qty += 1;

        } else {
            cart.items.push({ productId: product._id, qty: 1 });
        }
        if (!cart.totalPrice) {
            cart.totalPrice = 0;
        }
        cart.totalPrice += product.price;
        const savedUser = await user.save();
        if(savedUser) {
            return new ApiResponse(200, 'success', savedUser);
      }
    }
    return new ApiResponse(500, 'error', {err: 'unable to add to the cart'});

}

async function removeFromCart(request){
    const user  = request.user;
    const cart = user.cart;
    const product = await Product.findById(request.body.prodId);
    if(product){
        const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() == new String(product._id).trim());
        if(isExisting >=0){
            const quantity= cart.items[isExisting].qty;
            const price= quantity* product.price;
            cart.items.splice(isExisting,1);
            cart.totalPrice-=price;
            const savedUser= await user.save();
            console.log(savedUser);
            if(savedUser){
                return new  ApiResponse(200, 'success', savedUser);
            }
        }

    }
    return new ApiResponse(500, 'error', {err: 'unable to remove from cart'});

}

module.exports = {getCart, addToCart, removeFromCart };
