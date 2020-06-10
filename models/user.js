const mongoose = require('mongoose'),
    path = require('path'),
    { Product } = require(path.join(__dirname, 'product'));

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
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
    birthDate: Date,
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
    shppingAddress: {
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

    payment: {
        cardInfo: {
            cardeHolderName: {
                type: String,

            },
            exparationDate: {
                type: Date,

            },
            cardType: {
                type: String,

            }
        },
        billingAdress: {
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
});

userSchema.methods.addToCart = async function(productId) {
    const product = await Product.findById(productId);
    if (product) {
        const isExist = this.cart.items.findIndex(objInItems => new String(objInItems.productId).trim() == new String(product._id).trim());

        if (isExist >= 0) {
            this.cart.items[isExist].qty += 1;

        } else {
            this.cart.items.push({ productId: product._id, qty: 1 });
        }
        if (!this.cart.totalPrice) {
            this.cart.totalPrice = 0;
        }
        this.cart.totalPrice += product.price;
        return this.save();
    }
}
userSchema.methods.removeFromCart = function(productId) {
    const cart = this.cart;
    const isExist = this.cart.items.findIndex(objInItems => new String(objInItems.productId).trim() == new String(productId).trim());
    if (isExist >= 0) {
        cart.items.splice(isExist, 1);
        return this.save();
    }

}

module.exports = mongoose.model('User', userSchema)