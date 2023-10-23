var express = require("express");
var {validateTask} =require("../../middleware/validator/taskValidator")
var {validationResult} = require("express-validator")
var taskResponses = require("../../utils/helpers/responses");
var messages = require("../../utils/helpers/messages");
var { Task } = require("../../models/tasks/task");

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
taskRouter.post("/task", validateTask,(req, res) => {

  
      const newTask = new Task(req.body);

      const errors = validationResult(req).array().map(error => error.msg);
      if(errors.length>0){
          res.status(499).json(errors);
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