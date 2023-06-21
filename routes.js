const { Router } = require("express");

const UserController = require("./controller/UserController");
const SessionController = require("./controller/SessionController");
const Auth = require("./middlewares/Auth");
const routes = new Router();

// create a new user
routes.post("/users", UserController.create);
routes.post("/session", SessionController.create);

// Middlewares 

routes.use(Auth);

// routes to create the list of users 
routes.get("/users", UserController.index);

module.exports = routes;