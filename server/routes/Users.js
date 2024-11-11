const express = require("express");
const router = express.Router();

const { Users } = require('../models')

router.get("/", async (req, res) => {
    const allUsers = await Users.findAll();
    res.json(allUsers);
});

//try to add encryption
router.post("/check", async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists and password is correct (this depends on your logic)
    const user = await Users.findOne({ where: { email, password } });

    if (!user || password != user.password) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Respond with a success message or token
    res.status(200).json({ message: 'Login successful', user });

})

router.post("/add", async (req, res) => {
    
    await Users.create({
        email: req.body.email,
        password: req.body.password
    });
    res.json(req.body);

})


module.exports = router;