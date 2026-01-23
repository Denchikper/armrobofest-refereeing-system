const express = require('express');
const { registerParticipant } = require('../../controllers/auth/registerParticipantController');
const router = express.Router();


router.post('/', registerParticipant);

module.exports = router;