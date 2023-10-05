/* eslint-disable node/no-unsupported-features/es-syntax */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please provide your password'],
        validate: {
            // This will work on CREATE and SAVE
            validator: function(el){
                return el === this.password;
            },
            message: 'Passwords are not same'
        }
    },
});


const User = mongoose.model('User', userSchema);

module.exports = User;