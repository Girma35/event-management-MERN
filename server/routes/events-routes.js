const express = require("express");
const router = express.Router();
const Event = require("../models/events-models");


router.post("/create-event", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create event",
      error: error.message,
    });
  }
});

router.put("/edit-event/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({messsage:"Event Updated",updatedEvent});
  } catch (error) {
    res.status(400).json({
      message: "Failed to update event",
      error: error.message,
    });
  }
});


router.delete("/delete-event/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete event",
      error: error.message,
    });
  }
});



// GET: Fetch all events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({data:events});
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch events",
      error: error.message,
    });
  }
});

// GET: Fetch a single event by ID
router.get("/get-event/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({data:event});
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch event",
      error: error.message,
    });
  }
});


module.exports = router;
