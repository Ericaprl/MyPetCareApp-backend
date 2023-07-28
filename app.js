const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require ("cors");
class App{
    constructor(){
        this.server = express();
        this.database();
        this.middleware();
        
       // this.serverRoutes();
        this.routes();


    }
    middleware(){
        this.server.use(cors());
        this.server.use(express.json());

    }

    serverRoutes(){
        this.server.get("/users", (request, response) => {
            return response.json({
                message: "Accessed the user route",
            });
        })
        
        this.server.get("/chat", (request, response) => {
            return response.json({
                message: "Accessed the chat route",
            });
        })
        
        this.server.get("/createEvent", (request, response) => {
            return response.json({
                message: "Accessed the /search route",
            });
        })
        
        this.server.get("*",(request, response) => {
            return response.json({
                message: "Any other route",
            });
        });
        console.log("Server routes working just need to be conect it");
    }

    database(){
        console.log(" MongoDB is working" );
       mongoose
        .connect(
    "mongodb+srv://ericadeape:1Bv56DHBeyPOSNxE@petcaredatabase.di0jmud.mongodb.net/?retryWrites=true&w=majority", 
            {
            
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.error("Failed to connect to MongoDB:", error);
        });
        
    }

    routes(){
        // This is where we will be using our express router and setting up all of
    this.server.use(routes);
    }

}
module.exports = new App().server;
