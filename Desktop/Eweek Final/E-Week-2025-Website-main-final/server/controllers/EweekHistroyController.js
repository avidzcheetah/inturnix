import EweekHistroy from "../models/EweekHistroy.js";

export async function createEweekHistroy(req, res) {
  try {
    const event = new EweekHistroy(req.body);  // ✅ use the model
    console.log("📌 New event instance created:", event);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error("Error saving event:", err);
    res.status(500).json({ error: err.message });
  }
}






export async function getEweekHistroy(req, res) {
  try {
    const events = await EweekHistroy.find(); // fetch all documents
    res.status(200).json(events);             // send them as JSON
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: err.message });
  }
}


export async function getEweekHistroyById(req, res) {
  try {
    const { _id } = req.body; // fetch eventId from body

    if (!_id) {
      return res.status(400).json({ message: "eventId is required in the body" });
    }

    const event = await EweekHistroy.findOne({ _id });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).json({ error: err.message });
  }
}




export async function deleteEweekHistoryById(req, res) {
  try {
    const { _id } = req.body; // fetch eventId from body

    if (!_id) {
      return res.status(400).json({ message: "eventId is required in the body" });
    }

    const deletedEvent = await EweekHistroy.findByIdAndDelete(_id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully", deletedEvent });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: err.message });
  }
}

export async function updateEweekHistoryById(req, res) {
  try {
    const { _id, ...updateData } = req.body; // extract _id and remaining fields

    if (!_id) {
      return res.status(400).json({ message: "eventId (_id) is required in the body" });
    }

    const updatedEvent = await EweekHistroy.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true } // return updated doc, apply schema validation
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", updatedEvent });
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ error: err.message });
  }
}
