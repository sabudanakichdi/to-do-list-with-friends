const express = require("express");
const taskResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const { Task } = require("../models/tasks/task");

const routes = (app) => {
  const router = express.Router();


  router.get("/", (req, res) => {
    Task.find({}, { __v: 0 })
      .then((tasks) => {
        taskResponses.sendSuccess(res, messages.SUCCESSFUL, tasks);
      })
      .catch((e) => {
        taskResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });
  
  router.post("/tasks", (req, res) => {
    const newTask = new Task({
      title: req.body.title,
      group: req.body.group,
      tags: req.body.tags,  
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status,
      assignedTo: req.body.assignedTo,
      deadLine: req.body.deadLine,
      startDate: req.body.startDate,
      createdBy: req.body.createdBy,
      createdOn: req.body.createdOn,
    });

    if(!newTask.title) {
      taskResponses.sendError(res, messages.TITLE_REQUIRED);
      return;
    }

    newTask.save().then((result) => {
        taskResponses.sendSuccess(res, messages.SUCCESSFUL, result);
      })
      .catch((e) => {
        taskResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });


  //it's a prefix before api it is useful when you have many modules and you want to
  //differentiate b/w each module you can use this technique
  app.use("/api", router);
};
module.exports = routes;
