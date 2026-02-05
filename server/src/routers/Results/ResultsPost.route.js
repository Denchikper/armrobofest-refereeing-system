const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../middleware/auth.middleware');

router.get('/', requireAuth, ResultPostPractic);

module.exports = router;