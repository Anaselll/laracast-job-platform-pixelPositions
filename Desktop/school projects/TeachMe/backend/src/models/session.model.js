import mongoose from "mongoose";

const sessionSchema = mongoose.Schema(
  {
    offer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      required: true,
    },
    student_id: {
   
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
 
    },
    tutor_id: {
      
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
 
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "canceled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;
