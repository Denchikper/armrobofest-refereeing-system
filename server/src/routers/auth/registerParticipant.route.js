const express = require('express');
const { registerParticipant } = require('../../controllers/auth/registerParticipantController');
const { authenticate } = require('../../middleware/auth.middleware');
const router = express.Router();


router.post('/', authenticate("Organizer"), registerParticipant);

module.exports = router;