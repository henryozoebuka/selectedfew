import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    amount: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        default: 'No description from the sender.'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});

const TransactionModel = mongoose.model('Transaction', transactionSchema);

export default TransactionModel;