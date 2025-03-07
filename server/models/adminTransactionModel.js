import mongoose from 'mongoose';

const adminTransactionSchema = new mongoose.Schema({
    
    initiatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    approved: {
        type: Boolean,
        default: false,
    },

    received: {
        type: Boolean,
        default: false,
    },

    sent: {
        type: Boolean,
        default: false,
    },

    amount: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        default: 'No description from the sender.'
    },

    comment: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    approvedAt: {
        type: Date,
    },

});

const AdminTransactionModel = mongoose.model('AdminTransaction', adminTransactionSchema);

export default AdminTransactionModel;