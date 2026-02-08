const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Menu = require('../models/Menu');

// Create Reservation
router.post('/', async (req, res) => {
    const { userId, menuId, date, mealType } = req.body;
    try {
        // Check if menu exists and is available
        const menu = await Menu.findById(menuId);
        if (!menu || !menu.availability) {
            return res.status(400).json({ message: 'Menu not available' });
        }

        // Check if already reserved
        const existing = await Reservation.findOne({ userId, menuId });
        if (existing) {
            return res.status(400).json({ message: 'Already reserved' });
        }

        const reservation = new Reservation({
            userId,
            menuId,
            date,
            mealType
        });

        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get Reservations (User History or Staff View)
router.get('/', async (req, res) => {
    const { userId, date } = req.query;
    try {
        let query = {};
        if (userId) query.userId = userId;
        if (date) query.date = new Date(date); // Be careful with date matching logic

        const reservations = await Reservation.find(query).populate('menuId').populate('userId', 'name email');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Status (Staff: Mark as collected/eaten)
router.put('/:id/status', async (req, res) => {
    const { status } = req.body;
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
