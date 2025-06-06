const express = require('express');
const cors = require('cors');

require('dotenv').config();

const uploadRoute = require("./routes/upload.route")

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api/v1", uploadRoute);

app.listen(port, () => {
    console.log("Server is running at port: " + port);
})