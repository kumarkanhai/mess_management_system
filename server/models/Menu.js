const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    mealType: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
        required: true
    },
    items: [{
        name: { type: String, required: true },
        nutritionInfo: {
            calories: Number,
            protein: Number,
            carbs: Number,
            fats: Number,
            allergens: [String]
        },
        image: String,
        isVegetarian: Boolean
    }],
    availability: { type: Boolean, default: true },
    preparedQuantity: { type: Number, default: 0 }
});

module.exports = mongoose.model('Menu', MenuSchema);
