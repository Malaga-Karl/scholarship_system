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

const { AnnouncementHeader, AnnouncementContent  } = require('../models')

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

router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Fetch the announcement details and associated content
      const announcement = await AnnouncementHeader.findOne({
        where: { announcement_id: id },
        include: {
          model: AnnouncementContent,
          as: "content",
          attributes: ["content"], // Only fetch the content field
        },
      });
  
      if (!announcement) {
        return res.status(404).json({ error: "Announcement not found" });
      }
  
      res.status(200).json(announcement);
    } catch (error) {
      console.error("Error fetching announcement:", error);
      res.status(500).json({ error: "Failed to fetch announcement" });
    }
  });
  


    router.post("/create", upload.single('file'), async (req, res) => {
        
        try {
            // Create the AnnouncementHeader entry
            const header = await AnnouncementHeader.create({
            title: req.body.title,
            description: req.body.description,
            cover_path: "/announcements/" + req.file.filename, // Save file path
            status: "active",
            });
        
            // Create the AnnouncementContent entry
            await AnnouncementContent.create({
            announcement_id: header.announcement_id, // Use the correct ID from the created header
            content: req.body.content, // Save the content from the request body
            });
        
            // Respond with the created file details
            res.status(201).json({
            message: "Announcement created successfully",
            file: req.file,
            });
        } catch (error) {
            console.error("Error creating announcement:", error);
            res.status(500).json({ error: "Failed to create announcement" });
        }

    })

module.exports = router;