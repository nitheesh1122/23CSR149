const express = require("express");
const cors = require("cors");

const scheduleRoutes =
require("./routes/scheduleRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/schedule", scheduleRoutes);

module.exports = app;