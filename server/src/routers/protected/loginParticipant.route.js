const express = require('express');
const router = express.Router();
const { loginParticipant } = require('../../controllers/auth/loginParticipantController');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/', authMiddleware, loginParticipant);

module.exports = router;