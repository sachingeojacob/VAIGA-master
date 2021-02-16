const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    roleID: {
        type: Number,
        required: true
    }
});

const RegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    position: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Position'
    },
    mobile: {
        type: Number,
        required: true,
        maxlength: 10
    },
    image: {
        type: String
    },
    loginID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const loginSchema = mongoose.model('Login', LoginSchema);
const registrationSchema = mongoose.model('Registration', RegistrationSchema);

module.exports = {
    Login: loginSchema,
    Registration: registrationSchema
}