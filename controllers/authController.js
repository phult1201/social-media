const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

const authController = {
  register: async (req, res) => {
    try {
      const { firstname, lastname, email, username, password, gender } = req.body;
      const newUsername = username.toLowerCase().replace(/ /g, "");

      const isEmail = await Users.findOne({ email });
      if (isEmail) return res.status(400).json({ msg: "The email already exists." });

      const isUsername = await Users.findOne({ username });
      if (isUsername) return res.status(400).json({ msg: "The user name already exists." });

      if (password.length < 6) return res.status(400).json({ msg: "Password must be at least 6 characters." });

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new Users({
        firstname,
        lastname,
        email,
        username: newUsername,
        password: hashPassword,
        gender,
      });

      const access_token = createAccessToken({ _id: newUser._id });
      const refresh_token = createRefreshToken({ _id: newUser._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 7 * 24 * 60 * 60 * 1000,
      });
      await newUser.save().catch((error) => {
        if (error) return res.status(400).json({ error, msg: "Can't save to database" });
      });
      return res.status(201).json({ msg: "Register success", access_token });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: (req, res) => {
    try {
      const { email, password } = req.body;
      Users.findOne({ email })
        .populate("followers following", "-password")
        .exec(async (error, user) => {
          if (error) return res.status(400).json({ msg: "Something wrong." });
          if (!user) return res.status(401).json({ msg: "Email doesn't exists." });

          const isPassword = await bcrypt.compare(password, user.password);
          if (!isPassword) return res.status(401).json({ msg: "Password is incorrect." });

          const access_token = createAccessToken({ _id: user._id });
          const refresh_token = createRefreshToken({ _id: user._id });
          res.cookie("refreshtoken", refresh_token, {
            httpOnly: true,
            path: "/api/refresh_token",
            maxAge: 30 * 7 * 24 * 60 * 60 * 1000,
          });

          return res.status(200).json({ user, access_token, msg: "Login success" });
        });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.status(200).json({ msg: "Logout success" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(401).json({ msg: "Not logged in, please login to continute." });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (error, result) => {
        if (error) return res.status(401).json({ msg: "Invalid authentication. " });
        const user = await Users.findById(result._id).select("-password").populate("followers following", "-password");
        if (!user) return res.status(400).json({ msg: "User doesn't exists" });
        const access_token = createAccessToken({ _id: result._id });
        return res.status(200).json({ access_token, user });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
};

module.exports = authController;
