const { request, response } = require('express');

const
    mongoose = require('mongoose'),
    path = require('path'),
    { ApiResponse } = require(path.join(__dirname, "..", "util")),
    { User, Product } = require(path.join(__dirname, "..", "models")),
    cart = require(path.join(__dirname, './cart')),
    HashMap  =require('hashmap'),
    {Order}  = require(path.join(__dirname, '..', 'models')),
    {userService} = require(path.join(__dirname, '..', 'services'));


async function placeOrder(request) {
    console.log('here')
    let gainPoint;
    const user = request.user;
    const u = await user.populate('cart.items.productId').execPopulate();
    const cart = u.cart.items;
    const map = new HashMap();
    let ordered;
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
    let totalPrice = 0;
    for(i = 0; i < cart.length; i++) {
        console.log('hello')
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
        console.log(totalPrice)
        
        map.get(sellerId).push(productsInfo);
    }

    if(!u.gainPoint) {
        gainPoint = 0;
    }
    else{
        gainPoint = u.gainPoint
    }
   
    map.forEach( async (value, key) => {
          const order = new Order ({
             sellerId: key,
             buyerId: u._id,
             products: value,
             orderStatus: 'orderPlaced',
             cuponPayment: gainPoint,
             paymentFromCard: totalPrice - gainPoint,
             overAllPayment: totalPrice,
             shippingAddress: shippingAdress,
             billingInfo: paymentInfos
             
         })
         await order.save();
        
    });
    const orders = await Order.find({buyerId: u._id});
    if(orders) {
        u.cart.items = [];
        u.cart.totalPrice = 0;
        const us = await u.save();
        if(us) {
            return new ApiResponse(200, 'success', orders);
        }
    }

    return new ApiResponse(500, 'error', {error: 'We could not place your order'});
}

async function changeOrderStatus(request) {
    console.log('here')
    const orderId = request.body.orderId;
    console.log(orderId)
    const neworderStatus = request.body.orderStatus;
    const sellerId = request.user._id;
    const order = await Order.findOne({_id: orderId});
    if(order) {
        console.log('hello')
        if(order.orderStatus === 'orderPlaced'  && neworderStatus ==='Shipped') {
            order.orderStatus = neworderStatus;
            const o = await order.save();
            return new ApiResponse(200, 'success',  o);
        }
    
        else if(order.orderStatus === 'Shipped' && neworderStatus === 'Deliverd') {
            order.orderStatus = neworderStatus;
            const o = await order.save();
            if(o) {
                const u = await userService.gainPoint(order.buyerId, order.overAllPayment);
                if(u) {
                    return new ApiResponse(200, 'success', o);
                }
               
            }
         
        }
        else {
            return new ApiResponse(403, 'error', {err : 'please select logically consective order status'})
        }
    }
  
    else {
        return new ApiResponse(403, 'error', {err : 'No order with this id'})
    }
}

async function cancelOrder(request) {
    const orderId = request.body.orderId;
    const order = await Order.findOne({_id: orderId});
    if(order) {
        if(order.orderStatus === 'orderPlaced') {
            order.orderStatus = 'Cancelled';
            const o = await order.save();
            return new ApiResponse(200, 'success',  o);
        }
        else {
            return new ApiResponse(200, 'error', {err: 'you can not cancel you order at this point your order is purchased'});
        }
    }
    else {
        return new ApiResponse(200, 'error', {err: 'there is no any order with that id..'});
    }

}

async function orderHistory(request) {
    const buyerId = request.user._id;
    const order = await Order.find({buyerId: buyerId});
    if(order) {
        return new ApiResponse(200, 'success',  order);
    }
    else {
        return new ApiResponse(401, 'error', {err: 'you do not have any orders'});
    }
}
async function orders(request) {
    const sellerId = request.user._id;
    const order = await Order.find({sellerId: sellerId});
    if(order) {
        return new ApiResponse(200, 'success', order);
    }
    else {
        return new ApiResponse(401, 'error', {err: 'you do not have any orders'});
    }
}
module.exports = {
    placeOrder,
    changeOrderStatus,
    cancelOrder,
    orderHistory,
    orders
}