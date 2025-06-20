const express = require("express")

const { handleRandomWikiPageRoll } = require("../controllers/wiki.controller")

const router = express.Router();

router.get('/roll', handleRandomWikiPageRoll);

module.exports = router