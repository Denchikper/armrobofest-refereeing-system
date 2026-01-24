const express = require('express');
const router = express.Router();

router.use(require('./MissionsGet.route'));
router.use(require('./MissionsPatch.route'));

module.exports = router;