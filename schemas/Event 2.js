const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema({
  eventName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  invitedUsers: [{ type: String, required: true }],
});

module.exports = mongoose.model("Event", EventSchema);
