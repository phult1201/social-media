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
      const user = await Users.findById(req.params.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User dose not exists." });
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userController;
