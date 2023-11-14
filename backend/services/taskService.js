const { Task } = require("../models/tasks/task");
const allowedUpdates = [
  "title",
  "group",
  "tags",
  "description",
  "priority",
  "status",
  "assignedTo",
  "deadLine",
  "startDate",
  "createdBy",
];
const taskService = {
  async getTaskByGroup(groupName) {
    const taskArray = await Task.find({"group": groupName})
    if (taskArray)
      return taskArray;
    return null
  },

  async getTasks() {
    return Task.find({}, { __v: 0 });
  },

  async creatTask(task) {
    const newTask = new Task(task);
    newTask.save();
    return newTask;

  },

  async getTaskById(id) {
    const task = await Task.findById(id);
    if (task) {
      return task;
    }
  },

  async updateTask(id, taskUpdates) {
    const updates = Object.keys(taskUpdates);
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
        return "Not allowed";
    }
    const updatedTask = await Task.findByIdAndUpdate(id, taskUpdates, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      return false;
    }else{
        return updatedTask;
    }
  },

  async deleteTask(id) {
    try{
        await Task.findByIdAndDelete(id);
        return true;
    }catch(e){return false}
  },
};

module.exports = taskService;
