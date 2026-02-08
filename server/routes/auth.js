const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    const { name, email, password, role, studentId } = req.body;
    try {
        const user = new User({ name, email, password, role, studentId });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && user.password === password) { // In production use bcrypt
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                // token: generateToken(user._id), // In production
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
