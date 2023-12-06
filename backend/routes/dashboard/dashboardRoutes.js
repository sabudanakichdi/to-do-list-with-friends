const express = require('express');;
const dashboardRouter = express.Router();
const dashboardService = require('../../services/dashboardService');
const groupService = require('../../services/groupService');

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

dashboardRouter.get('/:userID/group', (req, res) => {
    groupService.getGroupsByUser(req.params.userID).then((result) => {
        res.status(200).json(result);
    }).catch((e) => {
        res.status(400).json(e);
    });
});


module.exports = dashboardRouter;