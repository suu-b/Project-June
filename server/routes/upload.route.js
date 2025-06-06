const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { handleFileUpload } = require("../controllers/upload.controller")


const router = express.Router()

const uploadDirectory = path.join(__dirname, "../../uploads");
if(!fs.existsSync(uploadDirectory)) fs.mkdirSync(uploadDirectory);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
})

const upload = multer({storage});

router.post("/upload", upload.single("file"), handleFileUpload);

module.exports = router;