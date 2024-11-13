const express = require("express");
const router = express.Router();


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

const { Foundations } = require('../models')

router.get("/getall", async (req, res) => {
    const allFoundations = await Foundations.findAll();
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

})





module.exports = router;