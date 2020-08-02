const express = require("express");
const router = express.Router();
const eventsData = require("../models/eventModel");

router
  .get("/", (req, res) => {
    eventsData
      .find()
      .then(events => res.json(events))
      .catch(error => res.json(error));
  })
  .get("/eventsByOrg", (req, res) => {
    eventsData.find();
  })
  .post("/create", (req, res) => {
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
  })
  .get("/:_id", (req, res) => {
    eventsData
      .findById(req.params._id)
      .then(event => res.json(event))
      .catch(err => res.json(err));
  });
module.exports = router;
