const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const eventsUrl = require("./api/events");
const orgsUrl = require("./api/organizers");
//const session = require("express-session");
//const cookieParser = require("cookie-parser");

const App = express();
dotenv.config();

mongoose.connect(
  process.env.db_con,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("eventsDB successfuly connected");
  }
);

App.use(cors());
App.use(express.json());
//App.use(cookieParser());
//App.use(session({ secret: process.env.MY_SECRET_TOKEN }));
App.use("/events", eventsUrl);
App.use("/organizer", orgsUrl);

App.listen(5000, () => {
  console.log("server running on port 5000");
});
