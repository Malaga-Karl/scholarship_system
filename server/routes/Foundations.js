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

const { Foundations, Scholarships } = require('../models')

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


router.post("/add", upload.single('logo'), async (req, res) => {
    
    await Foundations.create({
        name: req.body.name,
        description: req.body.description,
        logo_path: "/foundations/" + req.file.filename,
        status: req.body.status
    });
    res.json(req.file);

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



module.exports = router;