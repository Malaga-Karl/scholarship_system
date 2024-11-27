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

router.get("/getall", async (req, res) => {
    const allFoundations = await Foundations.findAll({
        where: { status: 'active' } // This filters results to where status is "active"
      });
      res.json(allFoundations);
  
});

router.post("/add", upload.single('file'), async (req, res) => {
    
    await Foundations.create({
        name: req.body.name,
        description: req.body.description,
        logo_path: "/foundations/" + req.file.filename,
        status: req.body.status
    });
    res.json(req.file);

});


router.get("/getallFS", async (req, res) => {
    try {
      const allFoundations = await Foundations.findAll({
        where: { status: 'active' }, // Fetch only active foundations
        include: [
          {
            model: Scholarships,
            as: 'scholarships', // Alias as defined in the association
          },
        ],
      });
  
      res.json(allFoundations); // Respond with the fetched data
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching foundations and scholarships." });
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


module.exports = router;