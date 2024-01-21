const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require('cors')
const User = require("./models/User");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

//connection to db
mongoose.connect(MONGODB_URI);

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads'));

// multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });
  module.exports = {upload}
  


  //routes
  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/tasks', require('./routes/tasksRoutes'));


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
