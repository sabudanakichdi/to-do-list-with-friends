const express = require('express');;
const dashboardRouter = express.Router();
const dashboardService = require('../../services/dashboardService');
const taskService = require('../../services/taskService');

dashboardRouter.get('/inprogress', (req, res) => {

    dashboardService.getInprogressTasks()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((e) => {
            res.status(400).json(e);
        });

});

dashboardRouter.get('/todo', (req, res) => {

    dashboardService.getTodoTasks().then((result) => {
        res.status(200).json(result);
    }).catch((e) => {
        res.status(400).json(e);
    });

});

dashboardRouter.get('/done', (req, res) => {

    dashboardService.getDoneTasks().then((result) => {
        res.status(200).json(result);
    }).catch((e) => {
        res.status(400).json(e);
    });
});

dashboardRouter.get('/:groupID/stats', (req, res) => {
    
        dashboardService.getGroupStatistics(req.params.groupID).then((result) => {
            res.status(200).json(result);
        }).catch((e) => {
            res.status(400).json(e);
        });
});


module.exports = dashboardRouter;