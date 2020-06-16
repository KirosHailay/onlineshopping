
const
    mongoose = require('mongoose'),
    path = require('path'),
    { ApiResponse } = require(path.join(__dirname, "..", "util")),
    { User, Product } = require(path.join(__dirname, "..", "models")),
    cart = require(path.join(__dirname, './cart')),
    HashMap  =require('hashmap'),
    {Order}  = require(path.join(__dirname, '..', 'models'))


async function placeOrder(request) {
    const user = request.user;
    const u = await user.populate('cart.items.productId').execPopulate();
    const cart = u.cart.items;
    const map = new HashMap();
    const shippingAdress = {
        country: u.shippingAddress[0].country,
        city: u.shippingAddress[0].city,
        state: u.shippingAddress[0].state,
        zipAddress: u.shippingAddress[0].zipAddress
    }
    const billingAddress = {
        country: u.billingInfo[0].billingAddress.country,
        city: u.billingInfo[0].billingAddress.city,
        state: u.billingInfo[0].billingAddress.state,
        zipAddress: u.billingInfo[0].billingAddress.AdresszipAddress
    }
    const cardInfo = {
        cardHolderName: u.billingInfo[0].cardInfo.cardHolderName,
        exparationDate: u.billingInfo[0].cardInfo.exparationDate,
        cardType: u.billingInfo[0].cardInfo.cardType,
        cardCode: u.billingInfo[0].cardInfo.cardCode
    }

    const paymentInfos = {
        "cardInfo": cardInfo,
        "billingAddress": billingAddress
    }
    const totalPrice = 0;
    for(i = 0; i < cart.length; i++) {
        const sellerId = cart[i].productId.sellerId.toString();
        if(!map.has(sellerId)) {
            map.set(sellerId, []);
        }
        let productsInfo = {
            "productId": cart[i].productId._id,
            "price": cart[i].productId.price,
            "title": cart[i].productId.title,
            "qty": cart[i].qty,
            "totalPayment": cart[i].productId.price * cart[i].qty
        }
        totalPrice += productsInfo.totalPayment;

        
        map.get(sellerId).push(productsInfo);
    }
   
    map.forEach( async (value, key) => {
         const order = new Order ({
             sellerId: key,
             buyerId: u._id,
             products: value,
             orderStatus: 'orderPlaced',
             cuponPayment: u.gainPoint,
             paymentFromCard: totalPrice - u.gainPoint,
             overAllPayment: totalPrice,
             shippingAddress: shippingAdress,
             billingInfo: paymentInfos
             
         })
         await order.save();

    });
    u.cart.items = [];
    u.cart.totalPrice = 0;
    const us = await u.save();
    if(us) {
        return new ApiResponse(200, 'success', {user: us});
    }
    


    return new ApiResponse(500, 'error', {error: 'We could not place your order'});
}

module.exports = {
    placeOrder
}