const express = require('express');
const router = express.Router();

const { getAllMissions } = require('../../controllers/missions/MissionsGetController');
const { requireAuth } = require('../../middleware/auth.middleware');

router.get('/', requireAuth, getAllMissions);

module.exports = router;