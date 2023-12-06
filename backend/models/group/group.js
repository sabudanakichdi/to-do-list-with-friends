
const  mongoose = require("mongoose");
const Group = mongoose.model("Group", {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  totalTask: {
    type: Array,
    trim: true,
  },
  totalInProgress: {
    type: String,
    trim: true,
  },
  userCount: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: String,
    trim: true
  },
  users: {
    type: Array,
    trim: true,
  },
});

module.exports = { Group };
