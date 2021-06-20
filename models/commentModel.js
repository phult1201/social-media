const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    tag: Object,
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    user: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);
