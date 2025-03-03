import ChatRoom from "../models/chatRoom.model.js";
import Offer from "../models/offer.model.js";
import Session from "../models/session.model.js";

export const createSession = async (req, res) => {
  const { offer_id, student_id, tutor_id } = req.body;
  try {
    let session = new Session();
    session.offer_id = offer_id;
    session.student_id = student_id;
    session.tutor_id = tutor_id;
    
    session.save();
    const offer = await Offer.findOne({ _id: offer_id });
    const startTime = new Date(offer.date);
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + offer.dure);
    console.log(session._id);
    const room = new ChatRoom();
    room.session_id = session._id;
    room.scheduled_start = startTime;
    room.scheduled_end = endTime;
    room.active = false;
    room.save();
    const offers = await Offer.findByIdAndUpdate(offer_id, {
      status: "accepted",
    });
    res.status(201).json({ message: "session created successfully" });
  } catch {
    res.status(500).json({ message: "error creating session" });
  }
};

export const showSessions=async(req,res)=>{
  try {
    const { userId, status,role } = req.query;
    const sessions = await Session.find({
      [role=="student"?"student_id":"tutor_id"]:userId,
      status,
    }).populate("tutor_id student_id offer_id");

    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Server error" });
  }

}