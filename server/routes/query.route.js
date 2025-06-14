const express = require('express')
const { handleQuery, handleTitleFormat } = require('../controllers/query.controller');

const router = express.Router();

router.post('/', handleQuery);
router.post('/format-title', handleTitleFormat);

module.exports = router;


