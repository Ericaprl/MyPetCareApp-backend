const User = require("../schemas/User");
const bcrypt = require("bcryptjs");

class UserController {
  async create(request, response) {

    // testing to see if it working 
    //const body = request.body;
   // console.log(body);

    const { fname, lname, email, username, password } = request.body;

    const paswdCrypt = await bcrypt.hash(password, 8);

    
    const user = await User.create({
      fname,
      lname,
      email,
      username,
      password: paswdCrypt,
    });
    return response.json(user);
  }

  // To create the list of users 
  async index(request, response) {
    const users = await User.find();
    return response.json(users);
  }
}

module.exports = new UserController();