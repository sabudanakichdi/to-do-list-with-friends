
var mongoose = require("mongoose");
const Task = mongoose.model("Task", {
  title: {
    type: String,
    trim: true,
    required: true,
  },
  group: {
    type: String,// Can be Group object
    trim: true,
  },
  tags: {
    type: Array,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  priority: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
  },
  assignedTo: {
    type: String,//Needs to be User object
    trim: true,
  },
  deadLine: {
    type: Date,
    trim: true,
  },
  startDate: {
    type: Date,
    trim: true,
  },
  createdBy: { //Can be User object
    type: String,
    trim: true,
  },
  createdOn: {
    type: Date,
    trim: true,
  },
});

module.exports = { Task };
