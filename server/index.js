const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors'); //instance of cors

const port = 3001;


//converts or use JSON as a post and get format
app.use(express.json());

//importing tables using sequelizer
const db = require('./models');

//cors? idk tho
app.use(cors({}));

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Routers/middleware?
const foundationsRouter = require('./routes/Foundations');
app.use("/foundations", foundationsRouter);
const announcementsRouter = require('./routes/Announcements');
app.use("/announcements", announcementsRouter);
const loginRouter = require('./routes/UserAuthentication');
app.use("/user", loginRouter);

db.sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
        console.log(`Server Running on port { ${port} }`);
    });
}).catch((err) => {
    console.error('Error syncing database:', err);
});