const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
   
    imageURL: {
        type: String
    },
    quantity : Number,

    price: Number,
    
    description: String,

    sellerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    approved: {
        type: Boolean,
       // required: true
    },
    Review: [{
        reviewContent: {
            type: String
        },
        reviewedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        reviewStatus: {
            type: Boolean
        },
        rating: {
            type: Number

        }
    }]
});

module.exports = mongoose.model('Product', productSchema);