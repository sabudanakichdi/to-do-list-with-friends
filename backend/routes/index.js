const taskRouter = require("./task/taskRoutes");
const groupRouter = require("./group/groupRoutes");
const authRouter = require("./auth/authRoutes");
const express = require("express");
const router = express.Router();

router.use('/auth', authRouter);
router.use("/task", taskRouter);
router.use("/group", groupRouter);

module.exports = router;
