const express = require('express');
const uploads = require('../middleware/multer');

const router = express.Router()

const { register, getOneUser } = require('../controllers/userController')

router.post('/register', uploads.single('profilePicture'), register);
router.get('/getOne/:id', getOneUser)

module.exports = router;