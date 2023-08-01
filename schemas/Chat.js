const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatSchema = new Schema({
  title: { type: String, required: true },
  addressees: [{ type: String, required: true }],
  message: { type: String, required: true },
});

module.exports = mongoose.model("Chat", ChatSchema);


