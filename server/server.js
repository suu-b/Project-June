const express = require('express');
const cors = require('cors');

require('dotenv').config();

const uploadRoute = require("./routes/upload.route")
const queryRoute = require("./routes/query.route")
const wikiRoute = require("./routes/wiki.route")

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: process.env.CLIENT_URI,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/v1/upload", uploadRoute);
app.use("/api/v1/query", queryRoute);
app.use("/api/v1/wiki", wikiRoute);

app.listen(port, () => {
    console.log("Server is running at port: " + port);
})