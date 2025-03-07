import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    thumbnail: {
        type: String, // This could be a URL string pointing to the image location
        // required: true
    },
    
    body: {
        // The HTML or Delta format content from Quill editor
        type: String, // You could alternatively use Array to store Delta JSON format if needed
        required: true
    },

    // Optionally, you might want to store some metadata like categories, tags, etc.
    // category: {
    //     type: String,
    //     default: 'uncategorized', 
    //     required: true
    // },

    // tags: [String], // Array of tags for categorizing blog posts

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
const EventModel = mongoose.model('Event', eventSchema);

export default EventModel;