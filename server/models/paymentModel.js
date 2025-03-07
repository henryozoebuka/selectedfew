import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true
    },

    users: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        paid: { type: Boolean, default: false }
    }],

    dueDate: {
        type: Date,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
    },
});

const PaymentModel = mongoose.model('Payment', paymentSchema);
export default PaymentModel;