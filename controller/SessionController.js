const { sign } = require("jsonwebtoken");
const User = require("../schemas/User");
const { compare } = require("bcryptjs");

class SessionController {

  async create(request, response) {
    try {
    const { username, password } = request.body;

    const user = await User.findOne({username});
    console.log(user);

    if (!user) {
      return response.status(404).json({ error: "User not found!" });
    }

    const matchPassword = await compare(password, user.password);

    if (!matchPassword) {
      return response
        .status(404)
        .json({ error: "Incorrect password or username!" });
    }

    const token = sign({}, "d5c7506650943503c93fced3763c935b", {
      subject: new String(user._id),
      expiresIn: "1y",
    });

    return response.json({
      token,
      user,
    });

  }catch (error) {
    console.error("Login error:", error);
    return response.status(500).json({ error: "Login failed." });
  }
}
}



module.exports = new SessionController();