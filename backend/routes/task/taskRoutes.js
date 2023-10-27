const express = require("express");
const {validateTask} =require("../../middleware/validator/taskValidator")
const {validationResult} = require("express-validator")
const taskResponses = require("../../utils/helpers/responses");
const messages = require("../../utils/helpers/messages");
const { Task } = require("../../models/tasks/task");

const taskRouter = express.Router();

const allowedUpdates = ["title", "group", "tags", "description", "priority", "status", "assignedTo", "deadLine", "startDate", "createdBy", "createdOn"];
   
//Get 
taskRouter.get("/task", (req, res) => {
      Task.find({}, { __v: 0 })
        .then((tasks) => {
          taskResponses.sendSuccess(res, messages.SUCCESSFUL, tasks);
        })
        .catch((e) => {
          taskResponses.sendError(res, messages.NOT_FOUND, e);
        });
    });

//Add Task
taskRouter.post("/task", validateTask,(req, res) => {

  
      const newTask = new Task(req.body);

      const errors = validationResult(req).array().map(error => error.msg);
      if(errors.length>0){
          return res.status(499).json(errors);
      };

      newTask
        .save()
        .then((result) => {
          taskResponses.sendSuccess(res, messages.SUCCESSFUL, result);
        })
        .catch((e) => {
          taskResponses.sendError(res, messages.BAD_REQUEST, e);
        });
});
//TODO: Add userId Header
//Get Task By Id
taskRouter.get("/task/:id",async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      taskResponses.sendError(res, messages.TASK_NOT_FOUND);
      return;
    }
    taskResponses.sendSuccess(res, messages.SUCCESSFUL, task);

});

//Update Task
taskRouter.patch("/task/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      taskResponses.sendError(res, messages.FORBIDDEN);
      return;
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      taskResponses.sendError(res, messages.TASK_NOT_FOUND);
      return;
    }

    taskResponses.sendSuccess(res, messages.SUCCESSFUL_UPDATE, updatedTask);
  } catch (error) {
    console.error(error); 
    taskResponses.sendError(res, messages.INTERNAL_SERVER_ERROR); 
  }
});

//Delete Task
taskRouter.delete("/task/:id", async (req,res)=>{ 

  const task =  await Task.findByIdAndDelete(req.params.id);
  if(!task){
    taskResponses.sendError(res, messages.TASK_NOT_FOUND);
    return;
  }
  taskResponses.sendSuccess(res, messages.SUCCESSFUL_DELETE);
});  

module.exports = taskRouter;    