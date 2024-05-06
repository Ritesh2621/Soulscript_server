import mongoose, { Mongoose } from "mongoose";

const BlogSchema = new mongoose.Schema({
  tittle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  category: {
    type: String,
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export const BlogModel = mongoose.model("blogs", BlogSchema);
