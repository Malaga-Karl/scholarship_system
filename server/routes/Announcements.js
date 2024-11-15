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

const { AnnouncementHeader } = require('../models')

router.get("/latest4", async (req, res) => {
    const latest4 = await AnnouncementHeader.findAll({
        limit: 4,
        order: [['createdAt', 'DESC']],
        where: {
            status: "active",
        }
    });
    res.json(latest4);
});

router.get("/all", async (req, res) => {
    const allAnnouncements = await AnnouncementHeader.findAll({
        order: [['createdAt', 'DESC']],
        where: {
            status: "active",
        }
    });
    res.json(allAnnouncements);
});


router.post("/create", upload.single('file'), async (req, res) => {
    
    await AnnouncementHeader.create({
        title: req.body.title,
        description: req.body.description,
        cover_path: "/announcements/" + req.file.filename,
        status: "active",
    });
    res.json(req.file);

})

module.exports = router;