const express = require("express");
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/announcements/');
    },
    filename: function(req, file, cb){
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});
const upload = multer({ storage });

const { Announcements } = require('../models')

router.get("/latest4", async (req, res) => {
    const latest4 = await Announcements.findAll({
        limit: 4,
        order: [['createdAt', 'DESC']]
    });
    res.json(latest4);
});

router.get("/all", async (req, res) => {
    const allAnnouncements = await Announcements.findAll({
        order: [['createdAt', 'DESC']]
    });
    res.json(allAnnouncements);
});


router.post("/create", upload.single('file'), async (req, res) => {
    
    await Announcements.create({
        post_header: req.body.post_header,
        description: req.body.description,
        coverImagePath: "/announcements/" + req.file.filename
    });
    res.json(req.file);

})

module.exports = router;