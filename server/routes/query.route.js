const express = require('express')
const { handleQuery, handleTitleFormat, handleSummarize } = require('../controllers/query.controller');

const router = express.Router();

router.post('/', handleQuery);
router.post('/format-title', handleTitleFormat);
router.post('/summarize', handleSummarize);

module.exports = router;


