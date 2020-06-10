const path = require('path'),
    { User } = require(path.join(__dirname, '..', 'models')),
    { ApiResponse, config } = require(path.join(__dirname, '..', 'util')),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken');

async function signin(body) {
    console.log(config)
    const user = await User.findOne({ userName: body.userName });
    if (user) {
        const isValid = await bcrypt.compare(body.password, user.password);
        if (isValid) {
            console.log('password....', )
            const token = jwt.sign({ data: body.userName }, config.jwtKey, {
                expiresIn: config.jwtExpirySeconds
            });
            return new ApiResponse(200, 'success', { token: token, expiresIn: config.jwtExpirySeconds, user: user });
        } else {
            return new ApiResponse(401, 'error', { err: 'username or password not exist' });
        }

    } else {
        return new ApiResponse(401, 'error', { err: 'username or password not exist' });
    }
}


async function signup(user) {
    const u = await User.findOne({ userName: user.userName });
    if (u) return new ApiResponse(401, "error", { err: "Username alaready taken" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const uu = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        birthdate: user.birthdate,
        role: user.role,
        password: hashedPassword
    });
    await uu.save()
    return new ApiResponse(200, "success", {});

}

module.exports = {
    signin,
    signup
}