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


module.exports = router;