import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 64 },
  content: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  deadLine: { type: Date },
  isRemoved: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  writer: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, ref: "User.name" },
    avatar_url: { type: String, ref: "User.avatar_url" },
  },
});

const db = mongoose.model("Task", TaskSchema);

export default db;
