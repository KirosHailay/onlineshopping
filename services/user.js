const path = require('path'),
    { User } = require(path.join(__dirname, '..', 'models')),
    { ApiResponse, config } = require(path.join(__dirname, '..', 'util'));

    async function addAddress(req) {
        const user = req.user;

        const shippingAdress = {
            country: req.body.country,
            city: req.body.city,
            state: req.body.state,
            zipAddress: req.body.zipAddress
        }
        user.shippingAddress.push(shippingAdress);
        const u = await user.save();
        return new ApiResponse(200, 'success', u);
    }

    async function addShippingInfo(req) {
        const cardInfo = {
            cardHolderName: req.body.cardHolderName,
            exparationDate: req.body.exparationDate,
            cardType: req.body.cardType,
            cardCode: req.body.cardCode
        }
        const billingAddress = {
            country: req.body.country,
            city: req.body.city,
            state: req.body.state,
            zipAddress: req.body.zipAddress
        }

        const paymentInfo = {
            "cardInfo": cardInfo,
            "billingAddress": billingAddress
        }
        const user = req.user;
        user.billingInfo.push(paymentInfo);
        const u = await user.save();
        return new ApiResponse(200, 'success',  u);
        
    }
    
    async function gainPoint(buyerId, overAllPayment) {
        const user = await User.findOne({_id: buyerId});
        if(user) {
            const point = overAllPayment * 0.001;
            user.gainPoint +=  point;
            const u = await user.save();
            return u;
        }
        else {
            return new ApiResponse(403, 'error', {err: 'No point added'});
        }
    }

    module.exports = {
        addAddress,
        addShippingInfo
    }