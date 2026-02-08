const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    imageUrl: { type: String },
    date: { type: Date, default: Date.now },
    mealType: { type: String } // Optional context if menuId is missing
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
