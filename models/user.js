const mongoose = require('mongoose'),
    path = require('path'),
    Product = require(path.join(__dirname, 'product')),
    { ApiResponse } = require(path.join(__dirname, '..', 'util'));

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    gainedPoint : {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    shippingAddress: [{
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
    }],
    billingInfo: [{
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
            cardCode: {
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
    }],
    birthDate: Date,
    gainedPoint: Number,
    cart: {
        items: [{
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'Product'
            },
            qty: {
                type: Number,
            }
        }],
        totalPrice: Number
    },
   
   
});

module.exports = mongoose.model('User', userSchema)