import mongoose from "mongoose";

const chatRoomSchema = mongoose.Schema(
  {
    session_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    studentReady: {
      type: Boolean,
      default: false,
    },
    tutorReady: {
      type: Boolean,
      default: false,
    },
    scheduled_start: {
      type: Date,
      required: true,
    },
    scheduled_end: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
export default ChatRoom;
