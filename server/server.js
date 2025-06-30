const express = require('express');
const cors = require('cors');

require('dotenv').config();

const uploadRoute = require("./routes/upload.route")
const queryRoute = require("./routes/query.route")
const wikiRoute = require("./routes/wiki.route")

const auth = require("./middleware/auth.middleware")

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: process.env.CLIENT_URI,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization,user-id'
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/v1/upload", auth, uploadRoute);
app.use("/api/v1/query", auth, queryRoute);
app.use("/api/v1/wiki", auth, wikiRoute);

app.listen(port, () => {
    console.log("Server is running at port: " + port);
})