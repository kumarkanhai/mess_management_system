const mongoose = require('mongoose');

const WasteLogSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    mealType: { type: String, required: true },
    totalPrepared: { type: Number, required: true },
    totalReserved: { type: Number, default: 0 },
    totalConsumed: { type: Number, default: 0 },
    wasteQuantity: { type: Number }, // in kg
    wasteReason: { type: String }
});

module.exports = mongoose.model('WasteLog', WasteLogSchema);
