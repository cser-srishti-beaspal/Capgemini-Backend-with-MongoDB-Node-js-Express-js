const express = require("express");
const cors = require("cors");

const app = express();
const router = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());
app.use('/api/auth', router)
module.exports = app;