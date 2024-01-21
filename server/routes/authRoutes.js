const express = require('express')
const router = express.Router();
const { registerController, loginController } = require('../controllers/authController');
const { upload } = require('../index');

router.post('/register', upload.single('profileImage'), registerController);
router.post('/login', loginController )

module.exports = router