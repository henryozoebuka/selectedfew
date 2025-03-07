import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
    },

    photo: {
        type: String,
    },

    role: {
        type: String,
        default: 'member',
    },

    accountNumber: {
        type: String,
        required: true,
    },

    accountBalance: {
        type: Number,
        default: 0,
    },

    verified: {
        type: Boolean,
        default: false,
    },

    status: {
        type: String,
        default: 'active',
    },

    OTPNumberOfAttempts: {
        type: Number,
        default: 0,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
    }
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;