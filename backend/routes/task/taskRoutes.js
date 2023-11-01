const express = require("express");
const { validateTask } = require("../../middleware/validator/taskValidator");
const taskService = require("../../services/taskService");
const taskResponses = require("../../utils/helpers/responses");
const messages = require("../../utils/helpers/messages");
const { validationResult } = require("express-validator");

const taskRouter = express.Router();

//Get
taskRouter.get("/", (req, res) => {
  taskService
    .getTasks(req, res)
    .then((result) => {
      taskResponses.sendSuccess(res, messages.SUCCESSFUL, result);
    })
    .catch((e) => {
      taskResponses.sendError(res, messages.BAD_REQUEST, e);
    });
});

//Add Task
taskRouter.post("/", validateTask, (req, res) => {
  const errors = validationResult(req)
    .array()
    .map((error) => error.msg);
  if (errors.length > 0) {
    return res.status(499).json(errors);
  }

  const result = taskService.creatTask(req.body);
  if (result) {
    taskResponses.sendSuccess(res, messages.SUCCESSFUL, result);
  } else {
    taskResponses.sendError(res, messages.BAD_REQUEST, e);
  }
});

//TODO: Add userId Header
//Get Task By Id
taskRouter.get("/:id", async (req, res) => {
  try {
    const result = await taskService.getTaskById(req.params.id);

   if(result){ taskResponses.sendSuccess(res, messages.SUCCESSFUL, result)};
   return taskResponses.sendError(res, messages.TASK_NOT_FOUND, e);
  } catch (error) {
    taskResponses.sendError(res, messages.BAD_REQUEST, error);
  }
});

//Update Task
taskRouter.patch("/:id", async (req, res) => {
  await taskService.updateTask(req.params.id, req.body).then((result) => {
    taskResponses.sendSuccess(res, messages.SUCCESSFUL, result);
  }).catch((e) => { 
    taskResponses.sendError(res, messages.BAD_REQUEST, e);
  });
});

//Delete Task
taskRouter.delete("/:id", async (req, res) => {
    const result = await taskService.deleteTask(req.params.id);
    if(result){
        taskResponses.sendSuccess(res, messages.SUCCESSFUL, "Task deleted");}
       else{
        taskResponses.sendError(res, messages.TASK_NOT_FOUND, "Task not found");
       } 
});

module.exports = taskRouter;
