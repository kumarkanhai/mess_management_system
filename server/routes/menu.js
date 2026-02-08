const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// Get Menu by Date
router.get('/', async (req, res) => {
    const { date } = req.query;
    try {
        const query = date ? { date: new Date(date) } : {};
        const menus = await Menu.find(query);
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create Menu (Admin/Staff)
router.post('/', async (req, res) => {
    try {
        const menu = new Menu(req.body);
        await menu.save();
        res.status(201).json(menu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update Menu
router.put('/:id', async (req, res) => {
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
