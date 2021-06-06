const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const access_token = req.header("Authorization");
    if (!access_token)
      return res.status(401).json({ msg: "Invalid authorization" });
    const decode = jwt.decode(access_token, process.env.ACCESS_TOKEN_SECRET);
    if (!decode) res.status(401).json({ msg: "Invalid authorization" });
    const user = await Users.findById(decode._id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = auth;
