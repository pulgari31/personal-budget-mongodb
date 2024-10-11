const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        minLength: 6
    }
}, { collection: 'budget' });

module.exports = mongoose.model('budget', budgetSchema);