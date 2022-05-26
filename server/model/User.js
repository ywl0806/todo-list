import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 5;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String },
  key_for_verify: { type: String, default: false },
  email_verified: { type: Boolean, default: false },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
  }
});

const model = mongoose.model("User", userSchema);

export default model;
