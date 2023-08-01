const Chat = require("../schemas/Chat");

class ChatController {
  async create(request, response) {
    try {
      const { title, addressees, message } = request.body;

      const chat = await Chat.create({
        title,
        addressees,
        message,
       
      });

      return response.status(201).json(chat);
    } catch (error) {
      console.error("Error creating chat:", error);
      return response.status(500).json({ error: "Error creating chat." });
    }
  }
  
  async index(request, response) {
    try {

      // To create the list of chats
      const chats = await Chat.find();
      return response.json(chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
      return response.status(500).json({ error: "Error fetching chats." });
    }
  }
}

module.exports = new ChatController();