const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true, maxLength: 25 },
    lastname: { type: String, required: true, trim: true, maxLength: 25 },
    username: { type: String, required: true, trim: true, maxLength: 25, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    role: { type: String, default: "user" },
    gender: { type: String, default: "male", enum: ["male", "female"] },
    mobile: { type: String, default: "" },
    address: { type: String, default: "" },
    story: { type: String, maxlength: 200 },
    website: { type: String, default: "" },
    followers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
