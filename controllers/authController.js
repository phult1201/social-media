const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

const authController = {
  register: async (req, res) => {
    try {
      const { firstname, lastname, email, username, password, gender } = req.body;
      const newFirstName = firstname.toLowerCase().replace(/ /g, "");
      const newLastName = lastname.toLowerCase().replace(/ /g, "");

      Users.findOne({ email });

      return res.json(req.body);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  logout: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = authController;
