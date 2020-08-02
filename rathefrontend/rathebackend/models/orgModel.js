const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    default: Date.now
  },
  password: {
    type: String,
    required: true
  },
  dateRegistered: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("organizersdb", organizerSchema);
