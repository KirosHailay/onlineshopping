const mongoose = require('mongoose'),
    path = require('path'),
    Product = require(path.join(__dirname, 'product')),
    { ApiResponse } = require(path.join(__dirname, '..', 'util')),
    Schema = mongoose.Schema;

const orderSchema = new Schema({
       sellerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
       },
       buyerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
       },
        products: [{
            productId: {
                type: mongoose.Types.ObjectId
            },
            price: {
                type: Number
            },
            title: {
                type: String
            },
            qty: {
                type: Number
            },
            totalPayment: {
                type: Number
            }
            }],
            orderStatus: {
                type: String,

            },
            paymentFromCard: Number,
            cuponPayment: Number,
            overAllPayment: Number,
            shippingAddress:{
                country: {
                    type: String,
        
                },
                city: {
                    type: String,
        
                },
                state: {
                    type: String,
        
                },
                zipAddress: {
                    type: String,
        
                }
            },    
            billingInfo: {
                cardInfo: {
                cardHolderName: {
                    type: String
    
                },
                exparationDate: {
                    type: Date,
    
                },
                cardType: {
                    type: String,
    
                },
                CardCode: {
                    type: Number
                }
            },
            billingAddress: {
                country: {
                    type: String,
        
                },
                city: {
                    type: String,
        
                },
                state: {
                    type: String,
        
                },
                zipAddress: {
                    type: String,
        
                }
            }
        }
           
})


module.exports = mongoose.model('Order', orderSchema)