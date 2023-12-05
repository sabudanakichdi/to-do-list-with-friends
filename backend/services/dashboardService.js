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
    },

    async getGroupStatistics(groupName) {

      try {
        
        const groupStatistics = await Task.aggregate([
          { $match: { group: groupName } },
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
            },
          },
        ]);
        console.log('groupStatistics', groupStatistics);
    
        const statisticsData = {
          inProgress: groupStatistics.find(stat => stat._id === 'in-progress')?.count || 0,
          toDo: groupStatistics.find(stat => stat._id === 'to-do')?.count || 0,
          done: groupStatistics.find(stat => stat._id === 'done')?.count || 0,
        
        };

        return statisticsData;
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }


    }

};

module.exports =  dashboardService;