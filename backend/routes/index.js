const taskRouter = require("./task/taskRoutes");
const groupRouter = require("./group/groupRoutes");

const routes = (app) => {
  app.use("/task", taskRouter);
  app.use("/group", groupRouter)
};
module.exports = routes;
