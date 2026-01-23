const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/pingController').ping);

module.exports = router;