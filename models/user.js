const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please enter a valid E-mail id i.e. abcd@gmail.com")
            }
        }
    },
    Password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password cant be password")
            }
        }
    },
    PhoneNumber: {
        type: Number,
        required: true,
        trim: true,
        minlength: 10,
        unique: true
    },
    Gender: {
        type: String,
        trim: true,
        enum: ['Male', 'Female']
    },
    Language: {
        type: String,
        triem: true,
        enum : ['English', 'Hindi']
    },
    MaritalStatus: {
        type: String,
        required: true,
        trim: true,
        enum: ['Married', 'Single', 'Divorced', 'Widow']
    },
    DOB: {
        type: Date,
        required: true
    },
    TimeOfBirth: {
        type: String,
        required: true
    },
    Profilepic: {
        type: String,
        default: "/images/profilepic.jpg"
    }
})

//below method is used to generate web token 
UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'newsapp')
    await user.save()
    return token
};

//below method id used for searching the user by credentials for logging into app
UserSchema.statics.findByCredentials = async (Email, Password) => {
    const user = await User.findOne({ Email: Email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(Password, user.Password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
};

//below is middleware
// hash the plain text password before saving
UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('Password')) {
        user.Password = await bcrypt.hash(user.Password, 8)
    }
    next();
});

var User = mongoose.model('User', UserSchema);

module.exports = User