const Comments = require("../models/commentModel");
const Posts = require("../models/postModel");

const commentController = {
  createComment: async (req, res) => {
    try {
      const { postId, content, tag, reply } = req.body;

      const newComment = new Comments({
        user: req.user._id,
        content,
        tag,
        reply,
      });

      await newComment.save();

      await Posts.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: newComment._id } },
        { new: true }
      );

      return res.status(200).json({ newComment });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateComment: async (req, res) => {
    try {
      const { content } = req.body;
      const newComment = await Comments.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        { content }
      );
      if (!newComment) return res.status(400).json({ msg: "Something wrong" });
      return res.status(200).json({ msg: "Update success" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      return res.status(200).json({ msg: "liked" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  unLikeComment: async (req, res) => {
    try {
      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );
      return res.status(200).json({ msg: "unliked" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = commentController;
