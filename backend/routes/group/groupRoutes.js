const express = require("express");
const { validateTask } = require("../../middleware/validator/taskValidator");
const groupService = require("../../services/groupService");
const serviceResponses = require("../../utils/helpers/responses");
const messages = require("../../utils/helpers/messages");
const { validationResult } = require("express-validator");
const taskService = require("../../services/taskService");

const groupRouter = express.Router();

//Get
groupRouter.get("/", (req, res) => {
  groupService
    .getGroup(req, res)
    .then((result) => {
      serviceResponses.sendSuccess(res, messages.SUCCESSFUL, result);
    })
    .catch((e) => {
      serviceResponses.sendError(res, messages.BAD_REQUEST, e);
    });
});

//Add Group
groupRouter.post("/", validateTask, (req, res) => {
  // const errors = validationResult(req)
  //   .array()
  //   .map((error) => error.msg);
  // if (errors.length > 0) {
  //   return res.status(499).json(errors);
  // }

  const result = groupService.createGroup(req.body);
  if (result) {
    serviceResponses.sendSuccess(res, messages.SUCCESSFUL, result);
  } else {
    serviceResponses.sendError(res, messages.BAD_REQUEST, e);
  }
});

//TODO: Add userId Header
//Get Group By Id
groupRouter.get("/:id", async (req, res) => {
  try {
    const result = await groupService.getGroupById(req.params.id);
    groupName = result["name"]
    const taskArray = await taskService.getTaskByGroup(groupName)
    if (taskArray)
      result["tasks"] = taskArray
   if(result){ serviceResponses.sendSuccess(res, messages.SUCCESSFUL, result)};
   return serviceResponses.sendError(res, messages.TASK_NOT_FOUND, e);
  } catch (error) {
    serviceResponses.sendError(res, messages.BAD_REQUEST, error);
  }
});

//Update Task
groupRouter.patch("/:id", async (req, res) => {
  await groupService.updateGroup(req.params.id, req.body).then((result) => {
    serviceResponses.sendSuccess(res, messages.SUCCESSFUL, result);
  }).catch((e) => { 
    serviceResponses.sendError(res, messages.BAD_REQUEST, e);
  });
});

//Delete Task
groupRouter.delete("/:id", async (req, res) => {
    const result = await groupService.deleteGroup(req.params.id);
    if(result){
      serviceResponses.sendSuccess(res, messages.SUCCESSFUL, "Task deleted");}
       else{
        serviceResponses.sendError(res, messages.TASK_NOT_FOUND, "Task not found");
       } 
});

module.exports = groupRouter;
