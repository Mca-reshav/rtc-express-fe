import mongoose from "mongoose";

const common = {
  userId: String,
  name: String,
}
const sessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    users: [{ ...common, socketId: String, online: Boolean }],
    content: { type: String, default: "" },
    messages: [{ ...common, message: String, timestamp: { type: Date, default: Date.now } }],
  },
  { timestamps: true }
);

export const Session = mongoose.model("Session", sessionSchema);