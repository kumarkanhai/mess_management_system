const express = require('express');
const router = express.Router();
const WasteLog = require('../models/WasteLog');
const Menu = require('../models/Menu');
const Reservation = require('../models/Reservation');

// Get Stats (Reserved vs Prepared)
router.get('/stats', async (req, res) => {
    // This would ideally aggregate data
    // Simple implementation:
    const { date } = req.query;
    try {
        const menus = await Menu.find({ date });
        // Logic to count reservations for these menus...
        res.json({ message: "Analytics endpoint" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Log Waste
router.post('/waste', async (req, res) => {
    try {
        const log = new WasteLog(req.body);
        await log.save();
        res.status(201).json(log);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
