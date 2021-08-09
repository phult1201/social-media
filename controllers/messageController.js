const Conversations = require("../models/conversationModel");
const Messages = require("../models/messageModal");

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

const messageController = {
  createMessage: async (req, res) => {
    try {
      const { recipient, text, media } = req.body;
      if (!recipient || (!text.trim() && media.length === 0)) return;
      const newConversation = await Conversations.findOneAndUpdate(
        {
          $or: [
            { recipients: [req.user._id, recipient] },
            { recipients: [recipient, req.user._id] },
          ],
        },
        {
          recipients: [req.user._id, recipient],
          text,
          media,
        },
        { new: true, upsert: true }
      );
      const newMessage = new Messages({
        conversation: newConversation._id,
        sender: req.user._id,
        recipient,
        text,
        media,
      });

      await newMessage.save();
      return res
        .status(201)
        .json({ msg: "Create success", newMessage, newConversation });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getConversations: async (req, res) => {
    try {
      const features = new APIfeatures(
        Conversations.find({
          recipients: req.user._id,
        }),
        req.query
      ).paginating();
      const conversations = await features.query
        .sort("updatedAt")
        .populate("recipients", "avatar lastname firstname username");

      return res
        .status(200)
        .json({ msg: "Success", conversations, result: conversations.length });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getMessages: async (req, res) => {
    try {
      const features = new APIfeatures(
        Messages.find({
          $or: [
            { sender: req.user._id, recipient: req.params.id },
            { sender: req.params.id, recipient: req.user._id },
          ],
        }),
        req.query
      ).paginating();
      const messages = await features.query.sort("-createdAt");

      return res
        .status(200)
        .json({ msg: "Success", messages, result: messages.length });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteMessage: async (req, res) => {
    try {
      await Messages.findOneAndDelete({
        _id: req.params.id,
        sender: req.user._id,
      });
      return res.status(200).json({ msg: "Delete success." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = messageController;
