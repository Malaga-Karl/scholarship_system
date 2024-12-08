const express = require("express");
const router = express.Router();

//storage management, file upload
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/foundations/');
    },
    filename: function(req, file, cb){
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});
const upload = multer({ storage });

const { Foundations, Scholarships, StudentScholarship, IndivScholarships  } = require('../models')
const Sequelize = require('sequelize');

//conditionals
const { Op } = require("sequelize");



//not used! < start
router.get("/getall", async (req, res) => {
    const allFoundations = await Foundations.findAll({
        where: { status: 'active' } // This filters results to where status is "active"
      });
      res.json(allFoundations);
  
});
//not used! < end


//foundation calls < start
router.get('/getAllPaginate', async (req, res) => {
  const { page = 1, limit = 5, search = '' } = req.query;
  const offset = (page - 1) * limit;

  try {
      const where = search
          ? {
                name: {
                    [Op.like]: `%${search}%`, // Adjust `Op.like` based on your database (case-insensitive in Sequelize)
                },
            }
          : {};

      const { count, rows } = await Foundations.findAndCountAll({
          where,
          offset: parseInt(offset),
          limit: parseInt(limit),
          order: [['createdAt', 'DESC']],
      });

      res.status(200).json({
          totalItems: count,
          foundations: rows,
          totalPages: Math.ceil(count / limit),
          currentPage: parseInt(page),
      });
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch foundations' });
  }
});

router.get("/getallFS", async (req, res) => {
  try {
    const allFoundations = await Foundations.findAll({
      where: { status: 'active' }, // Fetch only active foundations
      include: [
        {
          model: Scholarships,
          as: 'scholarships', // Alias as defined in the association
          include: [
            {
              model: StudentScholarship,
              as: 'studentScholarships', // Alias as defined in the association
              where: { status_id: 4 }, // Filter for accepted scholarships
              required: false, // Include even if no accepted students
              attributes: [], // Exclude individual rows, just count them
            },
          ],
          attributes: {
            include: [
              // Aggregate: count accepted applications
              [
                Sequelize.fn('COUNT', Sequelize.col('scholarships.studentScholarships.status_id')),
                'accepted_count',
              ],
            ],
          },
        },
      ],
      group: [
        'Foundations.foundation_id',
        'scholarships.scholarship_id',
        'scholarships.studentScholarships.scholarship_id', // Explicitly include group columns
      ],
      order: [[{ model: Scholarships, as: 'scholarships' }, 'deadline', 'ASC']], // Sort by Scholarships.deadline in ascending order
    });

    // Calculate remaining slots dynamically
    const foundationsWithSlots = allFoundations.map((foundation) => {
      foundation.scholarships = foundation.scholarships.map((scholarship) => {
        const acceptedCount = scholarship.dataValues.accepted_count || 0; // Use the calculated field
        return {
          ...scholarship.toJSON(),
          remaining_slots: scholarship.slots - acceptedCount,
        };
      });
      return foundation;
    });

    res.json(foundationsWithSlots); // Respond with the fetched and processed data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching foundations and scholarships." });
  }
});



router.post("/add", upload.single('logo'), async (req, res) => {

    if (!req.file) {
      return res.status(400).json({ error: 'Logo file is required.' });
    }
  
    try {
      const foundation = await Foundations.create({
        name: req.body.name,
        description: req.body.description,
        logo_path: "/foundations/" + req.file.filename,
        status: req.body.status
      });
      res.status(200).json({ message: "Foundation created successfully.", foundation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the foundation.' });
    }

});


router.put('/update/:id', upload.single('logo'), async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  const logo_path = req.file ? `/foundations/${req.file.filename}` : undefined;

  try {
    const [updated] = await Foundations.update(
      { name, description, logo_path, status },
      { where: { foundation_id: id } }
    );

    if (updated) {
      const updatedFoundation = await Foundations.findByPk(id);
      res.status(200).json(updatedFoundation);
    } else {
      res.status(404).json({ message: 'Foundation not found' });
    }
  } catch (error) {
    console.error('Error updating foundation:', error);
    res.status(500).json({ error: 'Failed to update foundation' });
  }
});

// Get a specific foundation by ID
router.get('/getF/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const foundation = await Foundations.findByPk(id);

      if (foundation) {
          res.status(200).json(foundation);
      } else {
          res.status(404).json({ message: 'Foundation not found' });
      }
  } catch (error) {
      console.error("Error fetching foundation:", error);
      res.status(500).json({ error: 'Failed to retrieve foundation' });
  }
});




// Delete a specific foundation by ID
router.delete('/deleteF/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deleted = await Foundations.destroy({ where: { foundation_id: id } });

      if (deleted) {
          res.status(200).json({ message: 'Foundation deleted successfully' });
      } else {
          res.status(404).json({ message: 'Foundation not found' });
      }
  } catch (error) {
      console.error("Error deleting foundation:", error);
      res.status(500).json({ error: 'Failed to delete foundation' });
  }
});
//foundation calls < end



// scholarship calls < start
// Handle POST request for adding a scholarship
router.post('/add_scholarship', upload.none(), async (req, res) => {
  try {
      const { foundation_id, title, slots, deadline, scholarship_description, eligibility, reqs, benefits } = req.body;

      // Parse the fields if necessary (split comma-separated values into arrays if needed) now de  
      // const eligibilityArray = eligibility ? eligibility.split(',') : [];
      // const reqsArray = reqs ? reqs.split(',') : [];
      // const benefitsArray = benefits ? benefits.split(',') : [];

      // Create a new scholarship record
      await Scholarships.create({
          foundation_id,
          title,
          slots,
          deadline,
          scholarship_description,
          eligibility: eligibility, // Save as comma-separated string
          reqs: reqs, // Save as comma-separated string
          benefits: benefits, // Save as comma-separated string
      });

      res.status(200).json({ success: 'Successfully added scholarship' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add scholarship' });
  }
});

router.get("/no_scholarship", async (req, res) =>{
  try {
    const foundations = await Foundations.findAll({
      include: { //these are for models to be used like INNER JOIN type of shi, as long you tied their connection
        model: Scholarships,
        as: 'scholarships',
        required: false, // This makes it a LEFT JOIN
      },
      where: { //where clause, where stuffs
        '$scholarships.foundation_id$': null, // Ensures no matching scholarship
      },
    });

    res.status(200).json(foundations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch foundations without scholarships' });
  }

});

router.get("/getAllScholarships", async (req, res) =>{
  try {
    const foundations = await Scholarships.findAll();

    res.status(200).json(foundations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch foundations without scholarships' });
  }
});

//foundation calls < start
router.get('/getAllPaginateS', async (req, res) => {
  const { page = 1, limit = 5, search = '' } = req.query;
  const offset = (page - 1) * limit;

  try {
      const where = search
          ? {
                title: {
                    [Op.like]: `%${search}%`, // Adjust `Op.like` based on your database (case-insensitive in Sequelize)
                },
            }
          : {};

      const { count, rows } = await Scholarships.findAndCountAll({
          where,
          offset: parseInt(offset),
          limit: parseInt(limit),
          order: [['createdAt', 'DESC']],
      });

      res.status(200).json({
          totalItems: count,
          foundations: rows,
          totalPages: Math.ceil(count / limit),
          currentPage: parseInt(page),
      });
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch foundations' });
  }
});

// Update scholarship by ID
router.put('/updateS/:id', upload.none(), async (req, res) => {
  const { id } = req.params;
  const { title, slots, deadline, scholarship_description, eligibility, reqs, benefits } = req.body;

  try {
      // Find the scholarship to update
      const scholarship = await Scholarships.findByPk(id);

      if (!scholarship) {
          return res.status(404).json({ message: 'Scholarship not found' });
      }

      // Update scholarship details
      scholarship.title = title || scholarship.title;
      scholarship.slots = slots || scholarship.slots;
      scholarship.deadline = deadline || scholarship.deadline;
      scholarship.scholarship_description = scholarship_description || scholarship.scholarship_description;
      scholarship.eligibility = eligibility || scholarship.eligibility;
      scholarship.reqs = reqs || scholarship.reqs;
      scholarship.benefits = benefits || scholarship.benefits;

      // Save the updated scholarship
      await scholarship.save();

      res.status(200).json({
          message: 'Scholarship updated successfully',
          scholarship,
      });
  } catch (error) {
      console.error("Error updating scholarship:", error);
      res.status(500).json({ error: 'Failed to update the scholarship' });
  }
});

// get specific foundation
router.get('/getS/:id', async (req, res) => {
  const { id } = req.params; // Get scholarship ID from route parameters

  try {
      // Find the scholarship by primary key (ID)
      const scholarship = await Scholarships.findByPk(id, {
          include: [
              {
                  model: Foundations, // If you want to include the associated foundation
                  as: 'foundation', // Alias used for the association
              },
          ],
      });

      if (!scholarship) {
          return res.status(404).json({ message: 'Scholarship not found' });
      }

      // Respond with the scholarship details
      res.status(200).json(scholarship);
  } catch (error) {
      console.error("Error fetching scholarship:", error);
      res.status(500).json({ error: 'Failed to fetch scholarship details' });
  }
});


// Delete a specific foundation by ID
router.delete('/deleteS/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deleted = await Scholarships.destroy({ where: { scholarship_id: id } });

      if (deleted) {
          res.status(200).json({ message: 'Scholarship deleted successfully' });
      } else {
          res.status(404).json({ message: 'Scholarship not found' });
      }
  } catch (error) {
      console.error("Error deleting Scholarship:", error);
      res.status(500).json({ error: 'Failed to delete Scholarship' });
  }
});

// scholarship calls < end



//individual scholarship < start
// Route to Add Individual Scholarship
router.post('/addIndivScholarship', upload.single('logo'), async (req, res) => {
  try {
    const { title, description, benefits } = req.body;

    // Validate required fields
    if (!req.file) {
      return res.status(400).json({ error: 'File upload is required.' });
    }
    if (!title || !description || !benefits) {
      return res.status(400).json({ error: 'Title, description, and benefits are required.' });
    }

    // Create a new scholarship record
    const newScholarship = await IndivScholarships.create({
      logo_path: "/foundations/" + req.file.filename, // File path of the uploaded logo
      title,
      description,
      benefits: Array.isArray(benefits) ? benefits.join(',') : benefits, // Ensure a comma-separated string
    });

    // Respond with success message
    res.status(201).json({
      message: 'Scholarship added successfully.',
      data: newScholarship,
    });
  } catch (error) {
    console.error('Error adding scholarship:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to Get Individual Scholarships
router.get('/getIndividualScholarships', async (req, res) => {
  const { page = 1, limit = 5, search = '' } = req.query;
  const offset = (page - 1) * limit;

  try {
      const where = search
          ? {
                title: {
                    [Op.like]: `%${search}%`, // Adjust `Op.like` based on your database (case-insensitive in Sequelize)
                },
            }
          : {};

      const { count, rows } = await IndivScholarships.findAndCountAll({
          where,
          offset: parseInt(offset),
          limit: parseInt(limit),
          order: [['createdAt', 'DESC']],
      });

      res.status(200).json({
          totalItems: count,
          indivScholarships: rows,
          totalPages: Math.ceil(count / limit),
          currentPage: parseInt(page),
      });
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch foundations' });
  }
});

// Route to Delete an Individual Scholarship by ID
router.delete('/deleteIndividualScholarship/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the scholarship by ID
    const scholarship = await IndivScholarships.findByPk(id);

    // If the scholarship does not exist
    if (!scholarship) {
      return res.status(404).json({ error: 'Scholarship not found' });
    }

    // Delete the scholarship
    await scholarship.destroy();

    res.status(200).json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    console.error('Error deleting scholarship:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to Update an Individual Scholarship by ID
router.put('/updateIndividualScholarship/:id', upload.single('logo'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, benefits } = req.body;

    // Find the scholarship by ID
    const scholarship = await IndivScholarships.findByPk(id);

    // If the scholarship does not exist
    if (!scholarship) {
      return res.status(404).json({ error: 'Scholarship not found' });
    }

    // Update the scholarship fields
    scholarship.title = title || scholarship.title;
    scholarship.description = description || scholarship.description;
    scholarship.benefits = benefits || scholarship.benefits;

    // Update the logo file if provided
    if (req.file) {
      scholarship.logo_path = "/foundations/" + req.file.filename;
    }

    // Save the updated scholarship
    await scholarship.save();

    res.status(200).json({
      message: 'Scholarship updated successfully',
      data: scholarship,
    });
  } catch (error) {
    console.error('Error updating scholarship:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route to fetch all rows
router.get('/getAllIndivScholarships', async (req, res) => {
  try {
      const indivScholarships = await IndivScholarships.findAll();

      return res.status(200).json({
          message: "IndivScholarships fetched successfully.",
          indivScholarships: indivScholarships,
      });
  } catch (error) {
      console.error("Error fetching IndivScholarships:", error);
      return res.status(500).json({
          message: "An error occurred while fetching the scholarships.",
          error: error.message,
      });
  }
});

// Route to Get an Individual Scholarship by ID
router.get('/getIndividualScholarship/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the scholarship by ID
    const scholarship = await IndivScholarships.findByPk(id);

    // If the scholarship does not exist
    if (!scholarship) {
      return res.status(404).json({ error: 'Scholarship not found' });
    }

    // Respond with the scholarship data
    res.status(200).json({
      message: 'Scholarship fetched successfully',
      indivScholarship: scholarship,
    });
  } catch (error) {
    console.error('Error fetching scholarship:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//individual scholarship <end



module.exports = router;