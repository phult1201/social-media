const Posts = require("../models/postModel");

const postController = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body;
      const newPost = new Posts({
        content,
        images,
        user: req.user._id,
      });

      await newPost.save();

      res.status(201).json({ msg: "Create a post success", newPost });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getPost: async (req, res) => {
    try {
      const posts = await Posts.find({
        user: [...req.user.following, req.user._id],
      })
        .sort("-createdAt")
        .populate("user likes", "avatar lastname firstname username");
      res.status(200).json({ msg: "Success", result: posts.length, posts });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body;

      const post = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          content,
          images,
        }
      ).populate("user likes", "avatar username firstname lastname");

      res.status(200).json({
        msg: "Update success",
        newPost: {
          ...post._doc,
          content,
          images,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = postController;
