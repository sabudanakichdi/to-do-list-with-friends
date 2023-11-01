const taskRouter = require("./task/taskRoutes");
const groupRouter = require("./group/groupRoutes");
const authRouter = require("./auth/authRoutes");

const routes = (app) => {
  app.use('/auth', authRouter);
  app.use("/task", taskRouter);
  app.use("/group", groupRouter)
};
module.exports = routes;
