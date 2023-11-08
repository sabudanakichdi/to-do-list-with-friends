const taskRouter = require("./task/taskRoutes");
const groupRouter = require("./group/groupRoutes");
const authRouter = require("./auth/authRoutes");
const dashboardRouter = require("./dashboard/dashboardRoutes");
const express = require("express");
const router = express.Router();

router.use('/auth', authRouter);
router.use("/task", taskRouter);
router.use("/group", groupRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router;
