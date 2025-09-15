const express = require('express');
const uploads = require('../middleware/multer');

const router = express.Router()

const { register } = require('../controllers/userController')

router.post('/register', uploads.single('profilePicture'), register);

module.exports = router;