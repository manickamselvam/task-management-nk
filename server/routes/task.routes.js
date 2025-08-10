const TaskController = require("../controllers/task.controller");

const { authenticate } = require("../config/jwt.config");

module.exports = function (app) {
  app.post("/api/tasks", TaskController.create);
  app.get("/api/tasks", TaskController.findAll);
  app.delete("/api/tasks/:id", TaskController.delete);
  app.put("/api/tasks/:id", TaskController.update);
  app.get("/api/tasks/:id", TaskController.findById);
  // app.get('/api/tasks/:id', TaskController.findByNumber);
};
