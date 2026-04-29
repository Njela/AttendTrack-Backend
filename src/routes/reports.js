const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');
const { getMyReport } = require('../controllers/reportsController');

router.get('/my', auth, getMyReport);

module.exports = router;