const express = require('express');
const router = express.Router();
const { loginParticipant } = require('../../controllers/auth/loginParticipantController');
const { requireAuth } = require('../../middleware/auth.middleware');

router.post('/', requireAuth, loginParticipant);

module.exports = router;