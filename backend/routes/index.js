const taskRouter = require("./task/taskRoutes");

const routes = (app) => {
  app.use("/api", taskRouter);
};
module.exports = routes;
