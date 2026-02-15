const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../middleware/auth.middleware');
const { postResultController } = require('../../controllers/Result/ResultPostController');

router.post('/', requireAuth, postResultController);

module.exports = router;