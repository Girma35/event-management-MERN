const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Event name is required"],
    },
    description: {
      type: String,
    },
    date:{
      type:String,
      required: [true, "Event date is required"],
    },
    time:{
      type:String,
      required: [true, "Event time  is required"],
    },
    media:{
      type:Array,
      required: [true, "Event time  is required"],
    }
  },
  {
    timestamps: true,
  }
);

// Create and export the Event model
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
