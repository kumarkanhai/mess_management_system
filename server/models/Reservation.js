const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    date: { type: Date, required: true },
    mealType: { type: String, required: true },
    status: {
        type: String,
        enum: ['reserved', 'collected', 'cancelled', 'no-show'],
        default: 'reserved'
    },
    reservedAt: { type: Date, default: Date.now },
    collectedAt: { type: Date }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
