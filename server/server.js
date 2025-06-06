const express = require('express');
const cors = require('cors');

require('dotenv').config();

const uploadRoute = require("./routes/upload.route")

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: process.env.CLIENT_URI,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions));
app.use("/api/v1", uploadRoute);

app.use(express.json());

app.listen(port, () => {
    console.log("Server is running at port: " + port);
})