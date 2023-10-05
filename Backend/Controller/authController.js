const jwt = require('jsonwebtoken')
const User = require('../Model/authModel');
const catchAsync = require('../Utils/catchAsync')
const AppError = require('../Utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
       expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res.cookie('jwt', token, cookieOptions);

    // remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, res);

});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1.Check if email and password exist
    if (!email || !password) {
        return next(new AppError('please provide email and password', 400))
    }
    // 2.Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !await user.correctPassword(password, user.password)) {
        return next(new AppError('Invalid email or password', 401))
    }
    // 3.If everything ok, send token to client
    createSendToken(user, 200, res);

});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).json({ status: 'success' });
  };

