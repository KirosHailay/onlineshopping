const path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    { authRoute, productRoute, authJWT } = require(path.join(__dirname, 'routes')),
    app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoute);
app.use(authJWT.verifyToken);
app.use('/products',productRoute);
// app.use('/orders', orderRoutes);

mongoose.connect('mongodb+srv://admin123:admin123@onlineshopping-igy6l.mongodb.net/onlineshopping?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Running on 3000');
        });
    }).catch(err => console.error(err));