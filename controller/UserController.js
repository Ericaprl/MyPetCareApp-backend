const User = require("../schemas/User");
const bcrypt = require("bcryptjs");

class UserController {
  async create(request, response) {


    const { fname, lname, email, username, password } = request.body;
    try {
    const paswdCrypt = await bcrypt.hash(password, 8);

    
    const user = await User.create({
      fname,
      lname,
      email,
      username,
      password: paswdCrypt,
    });
    console.log("New user:", user);

    return response.json(user);
  }
  catch (error) {
    console.error("Error creating user:", error);
    return response.status(500).json({ error: "Error creating user." });
  }
}

  // To create the list of users 
  async index(request, response) {
    try {
      const users = await User.find();

      console.log("List of user:", users);

      return response.json(users);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Failed to fetch users" });
    }
  }
}

module.exports = new UserController();