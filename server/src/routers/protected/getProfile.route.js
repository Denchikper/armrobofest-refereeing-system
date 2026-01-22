const express = require('express');
const router = express.Router();
const { getProfile } = require('../../controllers/getProfileController');
const { requireAuth } = require('../../middleware/auth.middleware');

// GET /api/user/profile
router.get('/', requireAuth, getProfile);

module.exports = router;