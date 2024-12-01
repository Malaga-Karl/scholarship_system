const express = require("express");
const router = express.Router();

//encryption management
const bcrypt = require('bcryptjs');
//key management
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize'); // Import Op for Sequelize operators

//file upload
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/profiles/');
    },
    filename: function(req, file, cb){
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});
const upload = multer({ storage });


const { ScholarshipStatus, UserProfile } = require('../models')


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
        const user = await UserAuthentication.findOne({
            where: { email: email },
          });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        //return res.json({user: { email: user.email, user_id: user.user_id } });

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Send token and user info as response
        res.json({ token, user: { email: user.email, user_id: user.user_id } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }


});

router.post("/add", async (req, res) => {
    const { email, last_name, first_name } = req.body;

    // Validate email
    if (!email || !last_name || !first_name) {
        return res.status(400).json({ error: "Email || Last_name || First_name are required" });
    }

    try {
        // Check if the user already exists
        const response = await UserProfile.findOne({
            where: {
                account_email: email,
            },
        });

        if (!response) {
            // Create a new user if not exists
            await UserProfile.create({
                account_email: email,
                first_name: first_name,
                last_name: last_name,
                scholarship_status: 1,
            });
            res.json({ message: "User status created successfully" });
        } else {
            // User already exists
            res.json({ message: "User already exists" });
        }
    } catch (error) {
        console.error('Error in adding status:', {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({ error: ' error' });
    }
});

router.get("/getUserInfo", async (req, res) => {
    const { user_id } = req.query; // Use req.query for GET request parameters

    // Fetch the user profileasdasdcvcvcvvcvcvccvcvcvcvcvcvcvccvcvccxvxccvcvbvbvvvccxxzzu
    try {
        const response = await UserProfile.findOne({
            where: { user_id: user_id },
        });

        // If the user profile doesn't exist
        if (!response) {
            return res.status(400).json({ 
                message: `User { ${user_id} } does not have a User Profile!` 
            });
        }

        // Return the found user profile
        return res.json(response);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ 
            message: "An error occurred while fetching the user profile." 
        });
    }
});

router.get('/getUsers', async (req, res) => {
    try {
        const allUserProfile = await UserProfile.findAll({
            where: {
                scholarship_status: {
                    [Op.between]: [1, 3], // Filter UserProfile by scholarship_status range
                },
            },
            include: [{
                model: ScholarshipStatus, // Ensure ScholarshipStatus is the correct imported model
                attributes: ['name'], // Fetch only the name field
                as: 'status', // Alias for the association (must match the alias in the model)
            }],
        });
        

        res.json(allUserProfile);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router;