const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticate } = require('../utils/authMiddleware');

const router = express.Router();

/**
 * Get Logged-In User
 * - Requires a valid JWT token in the Authorization header.
 */
router.get('/me', authenticate, (req, res) => {
    try {
        // `req.user` is set by the `authenticate` middleware
        res.status(200).json({ user: req.user });
    } catch (err) {
        console.error('Error fetching user details:', err.message);
        res.status(500).json({ message: 'Error fetching user details' });
    }
});

/**
 * Signup
 * - Creates a new user.
 */
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create a new user
        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error during signup:', err.message);
        res.status(500).json({ message: 'Error creating user' });
    }
});

/**
 * Login
 * - Authenticates a user and returns a JWT token.
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ message: 'Error logging in' });
    }
});

module.exports = router;

