const UserController = require("../controllers/user.controller");

const { authenticate } = require("../config/jwt.config");

module.exports = function (app) {
  app.post("/api/users", UserController.create);
  app.get("/api/users", UserController.findAll);
  app.post("/api/users/login", UserController.login);
  app.delete("/api/users/logout", UserController.logout);
  app.delete("/api/users/:id", authenticate, UserController.delete);
  app.put("/api/users/:id", authenticate, UserController.update);
  app.get("/api/users/:id", authenticate, UserController.findById);
};
