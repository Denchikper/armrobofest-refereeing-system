const express = require('express');
const requestLogger = require('../middleware/httpLogger.middleware');
const router = express.Router();

router.use('/auth/login', requestLogger, require('./auth/login.route'));
router.use('/auth/login-participant', requestLogger, require('./protected/loginParticipant.route'));
router.use('/auth/registerParticipant', requestLogger, require('./auth/registerParticipant.route'));
router.use('/auth/register', requestLogger, require('./auth/register.route'));

router.use('/ping', requestLogger, require('./ping.route'));

router.use('/user/get-profile', requestLogger, require('./protected/getProfile.route'));

router.use('/results', requestLogger, require('./Results/Results.route'));

router.use('/missions', requestLogger, require('./Missions/Missions.route'));

module.exports = router;