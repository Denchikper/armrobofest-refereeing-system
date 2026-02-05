const express = require('express');
const router = express.Router();

const { getAllMissions } = require('../../controllers/Missions/MissionsGetController');
const { requireAuth } = require('../../middleware/auth.middleware');

router.get('/', requireAuth, getAllMissions);

module.exports = router;