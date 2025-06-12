const express = require('express')
const { handleQuery } = require('../controllers/query.controller');

const router = express.Router();

router.post('/', handleQuery);

module.exports = router;


