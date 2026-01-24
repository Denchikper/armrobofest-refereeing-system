const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../middleware/auth.middleware');
const { patchMissions } = require('../../controllers/Missions/MissionsPatchController');

router.patch('/', requireAuth, patchMissions);

module.exports = router;