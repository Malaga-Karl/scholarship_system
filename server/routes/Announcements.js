const express = require("express");
const router = express.Router();
require('dotenv').config()
const { Sequelize } = require('sequelize');
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

//conditionals
const { Op } = require("sequelize");



const sequelize = new Sequelize({
    dialect: 'mysql', // Or 'postgres', 'sqlite', 'mssql', depending on your database
    host: 'localhost', // Replace with your database host
    username: 'root', // Replace with your database username
    password: '', // Replace with your database password
    database: 'scholarship_db', // Replace with your database name
}); // Adjust based on your Sequelize initialization





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
router.get("/allPaginate", async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query; // Defaults to page 1 and 10 items per page
    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    try {
        const allAnnouncements = await AnnouncementHeader.findAndCountAll({
            order: [['createdAt', 'DESC']],
            where: {
                status: "active",
            },
            limit,
            offset,
        });
        res.json({
            announcements: allAnnouncements.rows,
            total: allAnnouncements.count,
            page: parseInt(page),
            pageSize: parseInt(pageSize),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching announcements', error });
    }
});

router.get("/get/:id", async (req, res) => {
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

    });

    

    router.put('/update/:id', upload.single("file"), async (req, res) => {
        const { id } = req.params; // Announcement ID
        const { title, description, status, content } = req.body;
    
    
        try {
            // Start a transaction to ensure atomic updates
            await sequelize.transaction(async (transaction) => {
                // Update the AnnouncementHeader
                const header = await AnnouncementHeader.findByPk(id, { transaction });
                if (!header) {
                    return res.status(404).json({ message: 'AnnouncementHeader not found' });
                }
    
                // Build the update payload dynamically
                const updatePayload = { title, description, status };
                if (req.file) {
                    updatePayload.cover_path = `/announcements/${req.file.filename}`;
                }
    
                await header.update(updatePayload, { transaction });
    
                // Update the AnnouncementContent
                const contentRecord = await AnnouncementContent.findOne({
                    where: { announcement_id: id },
                    transaction,
                });
    
                if (contentRecord) {
                    // Update existing content
                    await contentRecord.update({ content }, { transaction });
                } else {
                    // Create new content if it doesn't exist
                    await AnnouncementContent.create(
                        { announcement_id: id, content },
                        { transaction }
                    );
                }
            });
    
            res.status(200).json({ message: 'Announcement updated successfully' });
        } catch (error) {
            console.error('Error updating announcement:', error);
            res.status(500).json({ error: 'Failed to update announcement' });
        }
    });

    
// Delete a specific announcement by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Announcement ID is required' });
    }

    try {
        const result = await sequelize.transaction(async (transaction) => {

            
            // Delete the AnnouncementContent
            const deletedContent = await AnnouncementContent.destroy({
                where: { announcement_id: id },
                transaction, // Ensure it's within the transaction
            });

            // Delete the AnnouncementHeader
            const deletedHeader = await AnnouncementHeader.destroy({
                where: { announcement_id: id },
                transaction, // Ensure it's within the transaction
            });

            if (!deletedHeader) {
                throw new Error('AnnouncementHeader not found'); // Rollback trigger
            }

            return { deletedHeader, deletedContent };
        });

        return res.status(200).json({
            message: 'Scholarship and related content deleted successfully',
            result,
        });
    } catch (error) {
        console.error("Error deleting Scholarship:", error.message);

        if (error.message === 'AnnouncementHeader not found' || error.message === 'AnnouncementContent not found') {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Failed to delete Announcement' });
    }
});

//paginate
router.get('/getAllPaginate', async (req, res) => {
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
  
        const { count, rows } = await AnnouncementHeader.findAndCountAll({
            where,
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['createdAt', 'DESC']],
        });
  
        res.status(200).json({
            totalItems: count,
            announcements: rows,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch announcements' });
    }
  });
    

module.exports = router;