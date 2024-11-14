const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { UserAuthentication } = require('../models')


// Secret key for JWT, ideally store this in an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

router.get("/getall", async (req, res) => {
    const allUsers = await UserAuthentication.findAll();
    res.json(allUsers);
});

router.post("/login", async (req, res) => {
    
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await UserAuthentication.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Send token and user info as response
        res.json({ token, user: { id: user._id, email: user.email, user_id: user.user_id } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }


})





module.exports = router;