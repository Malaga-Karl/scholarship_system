const express = require("express");
const router = express.Router();

//encryption management
const bcrypt = require('bcryptjs');
//key management
const jwt = require('jsonwebtoken');

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


const { UserAuthentication, UserProfile } = require('../models')


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

router.post("/add", upload.single('file'), async (req, res) => {
    const { email, password, first_name, last_name, phone_number, gender } = req.body;
    try{
        // Hash the password with bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await UserAuthentication.create({
            email: email,
            password: hashedPassword
        });

        await UserProfile.create({
            user_id: user.id,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            gender: gender,
            profile_picture_url: "/profiles/" + req.file.filename,
        });

        res.json({ message: "User created successfully", file: req.file, data: req.data });
    }catch(error){
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});
router.get("/getUserInfo", async (req, res) => {
    const { user_id } = req.query; // Use req.query for GET request parameters

    // Fetch the user profile
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





module.exports = router;