import mongoose from 'mongoose';

const paymentApprovalSchema = new mongoose.Schema({
    
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    amount: {
        type: Number,
        required: true,
    },

    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    description: {
        type: String,
        required: true,
    },

    approved: {
        type: Boolean,
        default: false,
    },

    approvedAt: {
        type: Date,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});

const PaymentApprovalModel = mongoose.model('PaymentApproval', paymentApprovalSchema);

export default PaymentApprovalModel;