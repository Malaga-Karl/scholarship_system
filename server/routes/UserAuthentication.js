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


const { ScholarshipStatus, UserProfile, StudentScholarship, Scholarships, Foundations, StudentIndivScholarship, IndivScholarships   } = require('../models')


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


//paginations
router.get('/getAllPaginate', async (req, res) => {
    const { page = 1, limit = 5, search = '', studentStatus = '' } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit); // Ensures proper pagination

    try {
        // Define the filtering criteria for both tables
        const where = {
            student_email: {
                [Op.like]: `%${search}%`,
            },
            status_id: {
                [Op.like]: `%${studentStatus}%`,
            },
        };

        // Query StudentScholarship table
        const studentScholarships = await StudentScholarship.findAll({
            where,
            include: [
                {
                    model: UserProfile,
                    attributes: ['account_email', 'first_name', 'last_name'],
                    as: 'userProfile',
                },
                {
                    model: ScholarshipStatus,
                    attributes: ['status_id', 'name'],
                    as: 'status',
                },
                {
                    model: Scholarships,
                    attributes: ['scholarship_id', 'title'],
                    as: 'scholarship',
                },
            ],
            offset,
            limit: parseInt(limit),
            order: [['createdAt', 'DESC']],
        });

        // Query StudentIndivScholarship table
        const studentIndivScholarships = await StudentIndivScholarship.findAll({
            where,
            include: [
                {
                    model: UserProfile,
                    attributes: ['account_email', 'first_name', 'last_name'],
                    as: 'userProfile',
                },
                {
                    model: ScholarshipStatus,
                    attributes: ['status_id', 'name'],
                    as: 'status',
                },
                {
                    model: IndivScholarships,
                    attributes: ['indiv_scholarship_id', 'title'],
                    as: 'indivScholarship',
                },
            ],
            offset,
            limit: parseInt(limit),
            order: [['createdAt', 'DESC']],
        });

        // Add 'source' field to distinguish between tables
        const studentScholarshipsWithSource = studentScholarships.map(record => ({
            ...record.toJSON(),
            source: 'StudentScholarship',
        }));

        const studentIndivScholarshipsWithSource = studentIndivScholarships.map(record => ({
            ...record.toJSON(),
            source: 'StudentIndivScholarship',
        }));

        // Combine both arrays into one
        const allScholarships = [...studentScholarshipsWithSource, ...studentIndivScholarshipsWithSource];

        // Paginate the combined results
        const paginatedScholarships = allScholarships.slice(offset, offset + parseInt(limit));

        // Return paginated results
        res.status(200).json({
            totalItems: allScholarships.length,  // Total items across both tables
            studentInfo: paginatedScholarships,
            totalPages: Math.ceil(allScholarships.length / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        console.error('Error fetching scholarships:', error);
        res.status(500).json({ error: 'Failed to fetch scholarships' });
    }
});


// Update user
router.put('/update/:id', upload.none(), async (req, res) => {
    const { id } = req.params; // Get the email (ID) of the user
    const { status_id } = req.body; // Get the new status_id from the request body

    try {
        // Check in StudentScholarship first
        let studentScholarship = await StudentScholarship.findOne({
            where: { student_email: id },
        });

        if (studentScholarship) {
            // Update the scholarship status in StudentScholarship
            studentScholarship.status_id = status_id; // Set the new status_id
            await studentScholarship.save(); // Save the updated record

            // Fetch the updated StudentScholarship with associated models
            const updatedScholarship = await StudentScholarship.findOne({
                where: { student_email: id },
                include: [
                    {
                        model: ScholarshipStatus,
                        attributes: ['status_id', 'name'],
                        as: 'status',
                    },
                    {
                        model: Scholarships,
                        attributes: ['scholarship_id', 'title'],
                        as: 'scholarship',
                    },
                ],
            });

            // Return the updated scholarship information
            return res.status(200).json(updatedScholarship);
        }

        // If not found in StudentScholarship, check in StudentIndivScholarship
        let studentIndivScholarship = await StudentIndivScholarship.findOne({
            where: { student_email: id },
        });

        if (studentIndivScholarship) {
            // Update the scholarship status in StudentIndivScholarship
            studentIndivScholarship.status_id = status_id; // Set the new status_id
            await studentIndivScholarship.save(); // Save the updated record

            // Fetch the updated StudentIndivScholarship with associated models
            const updatedIndivScholarship = await StudentIndivScholarship.findOne({
                where: { student_email: id },
                include: [
                    {
                        model: ScholarshipStatus,
                        attributes: ['status_id', 'name'],
                        as: 'status',
                    },
                    {
                        model: IndivScholarships,
                        attributes: ['indiv_scholarship_id', 'title'],
                        as: 'indivScholarship',
                    },
                ],
            });

            // Return the updated individual scholarship information
            return res.status(200).json(updatedIndivScholarship);
        }

        // If not found in both tables
        return res.status(404).json({ message: 'Student not found in any scholarship records' });

    } catch (error) {
        console.error('Error updating scholarship status:', error);
        res.status(500).json({ error: 'Failed to update scholarship status' });
    }
});

// Student has scholarship checker
router.get('/exists/:email', async (req, res) => {
    const { email } = req.params;

    try {
        // Check if the student_email exists in either StudentScholarship or StudentIndivScholarship
        const studentScholarshipExists = await StudentScholarship.findOne({
            where: { student_email: email },
        });

        const studentIndivScholarshipExists = await StudentIndivScholarship.findOne({
            where: { student_email: email },
        });

        // Return 1 if exists in either table, 0 otherwise
        if (studentScholarshipExists || studentIndivScholarshipExists) {
            return res.status(200).json({ exists: 1, from : studentScholarshipExists ? 'studentScholarship' : 'studentIndivScholarship' });
        } else {
            return res.status(200).json({ exists: 0 });
        }
    } catch (error) {
        console.error('Error checking student_email existence:', error);
        res.status(500).json({ error: 'Failed to check student_email existence' });
    }
});


// find all info
router.get('/getInfo/:email', async (req, res) => {
    const { email } = req.params;
    const { from } = req.query; // from should come from query params

    try {
        let studentInfo;
        if (from === "studentIndivScholarship") {
            // Fetch from StudentIndivScholarship if "from" is indivscholarship
            studentInfo = await StudentIndivScholarship.findOne({
                where: { student_email: email },
                include: [
                    {
                        model: UserProfile,
                        attributes: ['account_email', 'first_name', 'last_name'],
                        as: 'userProfile',
                    },
                    {
                        model: ScholarshipStatus,
                        attributes: ['status_id', 'name'],
                        as: 'status',
                    },
                    {
                        model: IndivScholarships, // Assuming it's the model for individual scholarships
                        attributes: [
                            'indiv_scholarship_id', 
                            'title', 
                            'description', 
                            'benefits', 
                            'logo_path',
                        ],
                        as: 'indivScholarship',
                    },
                ],
            });
        } else {
            // Default: Fetch from StudentScholarship
            studentInfo = await StudentScholarship.findOne({
                where: { student_email: email },
                include: [
                    {
                        model: UserProfile,
                        attributes: ['account_email', 'first_name', 'last_name'],
                        as: 'userProfile',
                    },
                    {
                        model: ScholarshipStatus,
                        attributes: ['status_id', 'name'],
                        as: 'status',
                    },
                    {
                        model: Scholarships,
                        attributes: [
                            'scholarship_id', 
                            'title', 
                            'scholarship_description', 
                            'eligibility', 
                            'reqs', 
                            'benefits', 
                            'deadline'
                        ],
                        as: 'scholarship',
                        include: [
                            {
                                model: Foundations,
                                attributes: ['foundation_id', 'name', 'description', 'logo_path', 'status'],
                                as: 'foundation',
                            },
                        ],
                    },
                ],
            });
        }

        if (!studentInfo) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(studentInfo);
    } catch (error) {
        console.error('Error fetching student info:', error);
        res.status(500).json({ error: 'Failed to fetch student information' });
    }
});





router.get('/getStatus', async (req, res) =>{
    try{
        const response = await ScholarshipStatus.findAll();
        res.status(200).json(response);
    }catch(error){
        console.log("Error in fetching statuses: " + error);
        res.status(500).json({error: 'Failed to fetch statuses'});
    }

});

/////makes a student scholarship status
router.post('/scholarshipStatus/add', upload.none(), async (req, res) => {
    try {
        const { name } = req.body;

        // Validation (optional)
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        // Create a new record in the ScholarshipStatus table
        const newScholarshipStatus = await ScholarshipStatus.create({ name });

        return res.status(201).json({ 
            message: 'ScholarshipStatus created successfully', 
            data: newScholarshipStatus 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create route for StudentScholarship
router.post('/studentScholarship/create', upload.none(), async (req, res) => {
    try {
        // Extract data from the request body
        const { student_email, scholarship_id, status_id } = req.body;

        // Validate required fields
        if (!student_email || !scholarship_id || !status_id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create a new StudentScholarship record
        const newStudentScholarship = await StudentScholarship.create({
            student_email,
            scholarship_id,
            status_id,
        });

        // Send a success response with the created record
        res.status(201).json({
            message: 'StudentScholarship record created successfully',
            data: newStudentScholarship,
        });
    } catch (error) {
        // Handle errors and send an appropriate response
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while creating the record',
        });
    }
});

//calculates remaining slots
router.get('/calculateSlots/:scholarshipId', async (req, res) => {
    const { scholarshipId } = req.params;

    try {
        // Fetch the scholarship by ID
        const scholarship = await Scholarships.findOne({
            where: { scholarship_id: scholarshipId },
        });

        if (!scholarship) {
            return res.status(404).json({ error: 'Scholarship not found' });
        }

        // Count students with status_id = 4 (approved) for this scholarship
        const approvedStudentsCount = await StudentScholarship.count({
            where: {
                scholarship_id: scholarshipId,
                status_id: 4,
            },
        });

        // Calculate remaining slots
        const remainingSlots = scholarship.slots - approvedStudentsCount;

        // Return the result
        res.status(200).json({
            scholarshipId,
            title: scholarship.title,
            originalSlots: scholarship.slots,
            approvedStudentsCount,
            remainingSlots,
        });
    } catch (error) {
        console.error('Error calculating slots:', error);
        res.status(500).json({ error: 'An error occurred while calculating slots' });
    }
});

//update student scholarship_id
// PUT route to update scholarship_id {{{{{{{{{{{OLD}}}}}}}}}}}
// router.put('/updateScholarship/:email', async (req, res) => {
//     const { email } = req.params;
//     const { new_scholarship_id } = req.body;

//     if (!email || !new_scholarship_id) {
//         return res.status(400).json({ message: "email and new_scholarship_id are required." });
//     }

//     try {
//         // Find the record by primary key (email)
//         const studentScholarship = await StudentScholarship.findOne({
//             where: { student_email: email }
//         });

//         if (!studentScholarship) {
//             return res.status(404).json({ message: "StudentScholarship entry not found." });
//         }

//         // Update the scholarship_id
//         studentScholarship.scholarship_id = new_scholarship_id;
//         await studentScholarship.save();

//         return res.status(200).json({
//             message: "Scholarship ID updated successfully.",
//             data: studentScholarship
//         });
//     } catch (error) {
//         console.error("Error updating scholarship ID:", error);
//         return res.status(500).json({ message: "An error occurred.", error });
//     }
// });

// POST route to insert a new StudentIndivScholarship record
router.post('/studentIndivScholarship/add', async (req, res) => {
    const { student_email, indiv_scholarship_id, status_id } = req.body;

    // Validate input
    if (!student_email || !indiv_scholarship_id || !status_id) {
        return res.status(400).json({
            message: "student_email, indiv_scholarship_id, and status_id are required.",
        });
    }

    try {
        // Create the new record
        const newStudentIndivScholarship = await StudentIndivScholarship.create({
            student_email,
            indiv_scholarship_id,
            status_id,
        });

        return res.status(201).json({
            message: "StudentIndivScholarship record created successfully.",
            data: newStudentIndivScholarship,
        });
    } catch (error) {
        console.error("Error creating StudentIndivScholarship record:", error);
        return res.status(500).json({
            message: "An error occurred while creating the record.",
            error: error.message,
        });
    }
});


// DELETE route to remove a StudentScholarship record
router.delete('/deleteStudentScholarship/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
        // Attempt to delete the record
        const result = await StudentScholarship.destroy({
            where: { student_email : email },
        });
  
        if (result === 0) {
            return res.status(200).json({
                message: "No record found to delete, Can proceed.",
            });
        }
  
        return res.status(200).json({
            message: "StudentScholarship record deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting StudentScholarship record:", error);
        return res.status(500).json({
            message: "An error occurred while deleting the record.",
            error: error.message,
        });
    }
  });


  // Update scholarship for a user
router.put('/updateScholarship/:email', async (req, res) => {
    const { email } = req.params; // Get the email from the request params
    const { new_scholarship_id, source} = req.body; // Get the new scholarship ID and source from the request body

    try {
        // Find records from both tables
        const studentScholarship = await StudentScholarship.findOne({ where: { student_email: email } });
        const studentIndivScholarship = await StudentIndivScholarship.findOne({ where: { student_email: email } });
        console.log("\n" + new_scholarship_id + " : " + source + "\n");
        // Handle updates based on the source
        if (source === 'StudentScholarship') {
            // If the selected scholarship is from `StudentScholarship`
            if (studentScholarship) {
                // Update the scholarship if it exists in `StudentScholarship`
                studentScholarship.scholarship_id = new_scholarship_id;
                await studentScholarship.save();
            } else {
                // Move the record from `StudentIndivScholarship` to `StudentScholarship`
                const status_id_store = studentIndivScholarship.status_id;
                if (studentIndivScholarship) {
                    await studentIndivScholarship.destroy(); // Remove from `StudentIndivScholarship`
                }
                await StudentScholarship.create({
                    student_email: email,
                    scholarship_id: new_scholarship_id,
                    status_id: status_id_store,
                });
            }
        } else if (source === 'StudentIndivScholarship') {
            // If the selected scholarship is from `StudentIndivScholarship`
            if (studentIndivScholarship) {
                // Update the scholarship if it exists in `StudentIndivScholarship`
                studentIndivScholarship.indiv_scholarship_id = new_scholarship_id;
                await studentIndivScholarship.save();
            } else {
                // Move the record from `StudentScholarship` to `StudentIndivScholarship`
                const status_id_store = studentScholarship.status_id;
                if (studentScholarship) {
                    await studentScholarship.destroy(); // Remove from `StudentScholarship`
                }
                await StudentIndivScholarship.create({
                    student_email: email,
                    indiv_scholarship_id: new_scholarship_id,
                    status_id: status_id_store,
                });
            }
        }

        res.status(200).json({ message: 'Scholarship updated successfully' });
    } catch (error) {
        console.error('Error updating scholarship:', error);
        res.status(500).json({ error: 'Failed to update scholarship' });
    }
});

module.exports = router;