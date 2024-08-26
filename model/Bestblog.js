import mongoose, { Mongoose } from "mongoose";

const BestblogSchema = new mongoose.Schema({
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
    type: Array,
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export const BestblogsModel = mongoose.model("Bestblogs", BestblogSchema);
