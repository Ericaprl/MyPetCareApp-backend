const { Router } = require("express");

const UserController = require("./controller/UserController");
const SessionController = require("./controller/SessionController");
const ContactController = require("./controller/ContactController"); 
const EventController = require("./controller/EventController");
const Auth = require("./middlewares/Auth");
const routes = new Router();

// create a new user
routes.post("/users", UserController.create);
routes.post("/session", SessionController.create);
routes.post("/contact", ContactController.sendEmail);
routes.post("/createEvent", EventController.create);

// Middlewares 

routes.use(Auth);

// routes to create the list of users 
routes.get("/users", UserController.index);
routes.get("/events", EventController.index);




module.exports = routes;