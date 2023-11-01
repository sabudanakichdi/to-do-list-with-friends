const taskRouter = require("./task/taskRoutes");
const authRouter = require("./auth/authRoutes");

const routes = (app) => {
  app.use('/auth', authRouter);
  app.use("/api", taskRouter);
};
module.exports = routes;
