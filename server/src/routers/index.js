const express = require('express');
const router = express.Router();

router.use('/auth/login', require('./auth/login.route'));
router.use('/auth/login-participant', require('./protected/loginParticipant.route'));
router.use('/auth/register', require('./auth/register.route'));


router.use('/user/get-profile', require('./protected/getProfile.route'));


module.exports = router;