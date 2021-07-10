const Posts = require("../models/postModel");
const Comments = require("../models/commentModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 3;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

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
  getPosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Posts.find({
          user: [...req.user.following, req.user._id],
        }),
        req.query
      ).paginating();

      const posts = await features.query
        .sort("-createdAt")
        .populate("user likes", "avatar lastname firstname username")
        .populate({
          path: "comments",
          populate: { path: "user likes", select: "-password" },
        });
      res.status(200).json({ msg: "Success", result: posts.length, posts });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      const post = await Posts.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });
      await Comments.deleteMany({ _id: { $in: post.comments } });

      return res.json({ msg: "Deleted Post." });
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
      )
        .populate("user likes", "avatar username firstname lastname")
        .populate({
          path: "comments",
          populate: { path: "user likes", select: "-password" },
        });

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
  likePost: async (req, res) => {
    try {
      const like = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );
      if (!like)
        return res.status(400).json({ msg: "This post does not exist." });

      return res.status(200).json({ msg: "liked" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  unLikePost: async (req, res) => {
    try {
      const like = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );
      if (!like)
        return res.status(400).json({ msg: "This post does not exist." });
      return res.status(200).json({ msg: "unliked" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUserPosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Posts.find({ user: req.params.id }),
        req.query
      ).paginating();

      const posts = await features.query.sort("-createdAt");
      return res.status(200).json({ posts, result: posts.length });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id)
        .populate("user likes", "avatar lastname firstname username")
        .populate({
          path: "comments",
          populate: { path: "user likes", select: "-password" },
        });

      if (!post)
        return res.status(400).json({ msg: "This post does not exist." });

      return res.status(200).json({ post });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getPostsDiscover: async (req, res) => {
    try {
      // const features = new APIfeatures(
      //   Posts.find({
      //     user: { $nin: [...req.user.following, req.user._id] },
      //   }),
      //   req.query
      // ).paginating();

      // const posts = await features.query.sort("-createdAt");

      const newArr = [...req.user.following, req.user._id];
      const num = req.query.num || 3;
      const posts = await Posts.aggregate([
        { $match: { user: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
      ]);

      if (!posts) return res.status(400).json({ msg: "Something wrong" });

      return res
        .status(200)
        .json({ msg: "Success", posts, result: posts.length });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = postController;
