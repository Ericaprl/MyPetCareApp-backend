const express = require("express");
const User = require("../schemas/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

class ResetPasswordController {

  async forgotPassword(request, response) {
    const { email } = request.body;
    const userEmail = process.env.EMAIL_USER;
      const userPassword = process.env.EMAIL_PASSWORD;
      const JWT_SECRET = process.env.JWT_SECRET;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      const newPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await User.findByIdAndUpdate(user._id, { password: hashedPassword });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // Send the new password to the user's email
      const transporter = nodemailer.createTransport({
        service: "gmail", 
        host:"smtp.gmail.com",
        port: 1717,
        secure:true,
        auth: {
          user: userEmail,
          pass: userPassword,
        },
      });

      await transporter.sendMail({
        from: userEmail,
        to: user.email,
        subject: "Password Reset",
        text: `Your new password: ${newPassword}`,
        html: 
        `Someone (hopefully you) has requested a password reset for your EP My Pet Care account.
        <br/>
        <br/>
        <br/>
        Click <a href="https://mypetcareapp-frontend.onrender.com/resetPassword/${token}">here</a> to reset your password.
        <br/>
        <br/>
        <br/>

        If you don't wish to reset your password, disregard this email and no action will be taken.
        <br/>
        <br/>
        <br/>
        EP My Pet Care Team`,

      });

      return response.json({ message: "Password reset successful. Check your email for the new password." });
    } catch (error) {
      console.error("Error resetting password:", error);
      return response.status(500).json({ error: "Failed to reset password" });
    }
  }

  async resetPassword(request, response) {
    const { token, password } = request.body;

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;

      const user = await User.findById(userId);

      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

   
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.findByIdAndUpdate(userId, { password: hashedPassword });

      return response.json({ message: "Password reset successful." });
    } catch (error) {
      console.error("Error resetting password:", error);
      return response.status(500).json({ error: "Failed to reset password" });
    }
  }


}

module.exports = new ResetPasswordController();
