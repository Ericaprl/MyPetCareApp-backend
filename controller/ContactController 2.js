const nodemailer = require("nodemailer");
require('dotenv').config();

class ContactController {
  async sendEmail(request, response) {
    try {
      const { name, email, message } = request.body;

      const userEmail = process.env.EMAIL_USER;
      const userPassword = process.env.EMAIL_PASSWORD;
      
      const transporter = nodemailer.createTransport({
        service: "gmail", 
        host:"smtp.gmail.com",
        port: 1717,
        secure:true,
        auth: {
          user: userEmail,
          pass:userPassword ,
        },
      
       
      });
     
     
      const mailOptions = {
        from:userEmail, 
        to: "ericadea.pe@hotmail.com", 
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

   
      await transporter.sendMail(mailOptions);

      return response.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error(error);
      return response
        .status(400)
        .json({ error: "Failed to send message. Please try again later." });
    }
  }
}

module.exports = new ContactController();
