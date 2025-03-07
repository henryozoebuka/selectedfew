import mongoose from 'mongoose';

const constitutionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    body: {
        type: String,
        required: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
    },

    published: {
        type: Boolean,
        default: false
    }
});

// Create a Blog model based on the schema
const ConstitutionModel = mongoose.model('Constitution', constitutionSchema);

export default ConstitutionModel;