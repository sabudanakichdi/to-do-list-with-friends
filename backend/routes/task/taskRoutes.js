const express = require("express");
const taskResponses = require("../../utils/helpers/responses");
const messages = require("../../utils/helpers/messages");
const { Task } = require("../../models/tasks/task");

const taskRouter = express.Router();

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
taskRouter.post("/task", (req, res) => {
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
      //Title Field is required
      if (!newTask.title) {
        taskResponses.sendError(res, messages.TITLE_REQUIRED);
        return;
      }

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
    
     await Task.findById(req.params.id, { __v: 0}).then((result) => {
        taskResponses.sendSuccess(res, messages.SUCCESSFUL, result);
      }).catch((e) => { 
        taskResponses.sendError(res, messages.TASK_NOT_FOUND, e);
      });

});

//Update Task
taskRouter.patch("/task/:id", async (req,res)=>{
    const updates = Object.keys(req.body);
    //need to remove few fields from updates
    const allowedUpdates = ["title", "group", "tags", "description", "priority", "status", "assignedTo", "deadLine", "startDate", "createdBy", "createdOn"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
      taskResponses.sendError(res, messages.FORBIDDEN);
      return;
    }
    await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).then((result) => {
        taskResponses.sendSuccess(res, messages.SUCCESSFUL_UPDATE, result);
      }).catch((e) => { 
        taskResponses.sendError(res, messages.TASK_NOT_FOUND, e);
      });

})

//Delete Task
taskRouter.delete("/task/:id", async (req,res)=>{ 

    await Task.findByIdAndDelete(req.params.id).then((result) => {
        taskResponses.sendSuccess(res, messages.SUCCESSFUL_DELETE);
      }).catch((e) => { 
        taskResponses.sendError(res, messages.TASK_NOT_FOUND, e);
      });
});  

module.exports = taskRouter;    