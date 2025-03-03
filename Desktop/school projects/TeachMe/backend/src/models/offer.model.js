import mongoose from "mongoose";
import Category from "./category.model.js";

const offerSchema = mongoose.Schema(
  {
    creator_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    offer_type: {
      type: String,
      enum: ["find_tutor", "find_student"],
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "accepted", "closed"],
      default: "open",
    },
    price: {
      type: Number,
      default: 0,
    },
    accepted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    date: {
      type: Date,
      required: true,
    },
    dure: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Offer = mongoose.model("Offer", offerSchema);
export default Offer;
