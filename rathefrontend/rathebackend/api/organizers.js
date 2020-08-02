const express = require("express");
const router = express.Router();
const orgData = require("../models/orgModel");
const eventsData = require("../models/eventModel");
const { checkSignin, checkSignup } = require("../auth");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

router
  .get(
    "/",
    /* authenticatefunc, */ (req, res) => {
      orgData
        .find()
        .then(org => res.json(org))
        .catch(err => res.json(err));
    }
  )
  .post("/signup", async (req, res) => {
    const { error } = checkSignup(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const existingEmail = await orgData.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).send("Email already exists");
    }

    const existingOrg = await orgData.findOne({ userName: req.body.userName });
    if (existingOrg) {
      return res.status(400).send("User Name already exists");
    }

    const saltPassword = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, saltPassword);

    const newOrganizer = await new orgData({
      fullName: req.body.fullName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      address: req.body.address
    });
    newOrganizer
      .save()
      .then(async organiser => {
        const userEmail = req.body.email;
        const user = { email: userEmail };
        const userObject = await orgData.findOne({ email: userEmail });
        const { _id } = await userObject;
        const sessionToken = jwt.sign(user, process.env.MY_SECRET_TOKEN);
        res.json({ organiser, accessToken: sessionToken, _id });
      })
      .catch(err => res.json(err));
  })
  .post("/signin", async (req, res) => {
    const { error } = checkSignin(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const eventOrg = await orgData.findOne({ email: req.body.email });
    if (!eventOrg) {
      return res.status(400).send(`Email does not exist`);
    }
    const correctPassword = await bcrypt.compare(
      req.body.password,
      eventOrg.password
    );
    if (!correctPassword) {
      return res.sendStatus(400).send(`Incorrect Password`);
    }
    const userEmail = req.body.email;
    const user = { email: userEmail };
    const userObject = await orgData.findOne({ email: userEmail });
    const userId = await userObject._id;
    const sessionToken = await jwt.sign(user, process.env.MY_SECRET_TOKEN);
    res.json({ accessToken: sessionToken, _id: userId });
  });
authenticatefunc = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (typeof authHeader !== "undefined") {
    const bearer = authHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
  //next();
};
router
  .get("/:_id", authenticatefunc, (req, res) => {
    jwt.verify(req.token, process.env.MY_SECRET_TOKEN, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        orgData
          .findById(req.params._id)
          .then(organizer => res.json({ organizer, authData }))
          .catch(err => res.json(err));
      }
    });
  })
  .post("/addevent", authenticatefunc, (req, res) => {
    jwt.verify(req.token, process.env.MY_SECRET_TOKEN, (err, authData) => {
      const newEvent = new eventsData({
        eventName: req.body.eventName,
        description: req.body.description,
        organizer: req.body.organizer,
        venue: req.body.venue,
        location: req.body.location,
        eventDate: req.body.eventDate,
        eventTime: req.body.eventTime
      });
      newEvent
        .save()
        .then(events => res.json(events))
        .catch(error => res.json(error));
    });
  });
module.exports = router;
/**
 *   const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.MY_SECRET_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
 */
