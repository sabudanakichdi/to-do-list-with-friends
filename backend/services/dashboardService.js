const {Task} = require("../models/tasks/task");
const {Group} = require("../models/group/group"); 
const {User} = require("../models/user/User");

const dashboardService = {
    async getInprogressTasks() {
        const taskArray = await Task.find({"status": "in-progress"})
        if (taskArray){
            const tasks = taskArray.map((task) => task.toObject());
            return tasks;
        }else{
            return null;
        }
          
    },

    async getTodoTasks() {

        const taskArray = await Task.find({"status": "to-do"})
        if (taskArray)
          return taskArray;
        return null
    },

    async getDoneTasks() {

        const taskArray = await Task.find({"status": "done"})
        if (taskArray)
          return taskArray;
        return null
    }

};

module.exports =  dashboardService;