const express = require('express');
const router = express.Router();

router.use(require('./ResultsPost.route'));

module.exports = router;