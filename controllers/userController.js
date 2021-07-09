const Users = require("../models/userModel");

const userController = {
  searchUsers: async (req, res) => {
    try {
      const users = await Users.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("firstname lastname username avatar");

      res.json(users);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id)
        .select("-password")
        .populate("followers following", "-password");
      if (!user) return res.status(400).json({ msg: "User dose not exists." });
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const {
        avatar,
        firstname,
        lastname,
        address,
        mobile,
        website,
        story,
        gender,
      } = req.body;

      if (!firstname || !lastname)
        return "First name and Last name is required!";
      await Users.findByIdAndUpdate(req.user._id, {
        avatar,
        firstname,
        lastname,
        address,
        mobile,
        website,
        story,
        gender,
      });
      res.status(200).json({ msg: "Update success" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  follow: async (req, res) => {
    try {
      const user = await Users.find({
        _id: req.params.id,
        followers: req.user._id,
      });

      if (user.length > 0)
        return res.status(200).json({ msg: "You followed this user." });

      await Users.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { followers: req.user._id } },
        { new: true }
      );

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { following: req.params.id } },
        { new: true }
      );

      return res.status(200).json({ msg: "Followed success" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  unfollow: async (req, res) => {
    try {
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { followers: req.user._id } },
        { new: true }
      );

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { following: req.params.id } },
        { new: true }
      );

      return res.status(200).json({ msg: "Unfollow success" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  suggestionsUser: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id];
      const num = req.query.num || 5;
      const users = await Users.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
        {
          $lookup: {
            from: "users",
            localField: "followers",
            foreignField: "_id",
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "following",
            foreignField: "_id",
            as: "following",
          },
        },
      ]).project("-password");

      if (!users) return res.status(400).json({ msg: "Something wrong" });
      return res.status(200).json({ users, result: users.length });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userController;
