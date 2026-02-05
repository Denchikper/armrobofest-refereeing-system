const express = require('express');
const router = express.Router();
const { register } = require('../../controllers/auth/registerController');
const { authenticate } = require('../../middleware/auth.middleware');

router.post('/', authenticate("Organizer"), register);

module.exports = router;