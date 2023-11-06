
const  mongoose = require("mongoose");
const Group = mongoose.model("Group", {
  id: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
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
  }
});

module.exports = { Group };
