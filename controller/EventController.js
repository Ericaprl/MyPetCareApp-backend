const Event = require("../schemas/Event");

class EventController {
  async create(request, response) {
    try {
      const { eventName, location, date, time, invitedUsers, creator } = request.body;

      const event = await Event.create({
        eventName,
        location,
        date,
        time,
        invitedUsers,
        creator,
      });

      return response.status(201).json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      return response.status(500).json({ error: "Error creating event." });
    }
  }
  async index(request, response) {
    try {

      // To create the list of users 
      const events = await Event.find();
      return response.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      return response.status(500).json({ error: "Error fetching events." });
    }
  }
}

module.exports = new EventController();
