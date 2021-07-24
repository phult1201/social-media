const Notifies = require("../models/notifyModel");

const notifyController = {
  createNotify: async (req, res) => {
    try {
      const { id, recipients, url, text, content, image } = req.body;

      if (recipients.includes(req.user._id.toString())) return;

      const notify = new Notifies({
        id,
        recipients,
        url,
        text,
        content,
        image,
        user: req.user._id,
      });

      await notify.save();

      return res.status(201).json({ msg: "Create success a notify.", notify });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  removeNotify: async (req, res) => {
    try {
      const notify = await Notifies.findOneAndDelete({
        id: req.params.id,
        url: req.query.url,
      });

      return res.status(200).json({ msg: "Remove a notify.", notify });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getNotifies: async (req, res) => {
    try {
      const notifies = await Notifies.find({
        recipients: req.user._id,
      })
        .sort("-createdAt")
        .populate("user", "avatar lastname firstname");
      return res.status(200).json({ notifies });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  isReadNotify: async (req, res) => {
    try {
      const notifies = await Notifies.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { isRead: true }
      );

      return res.status(200).json({ msg: "Update notify success", notifies });
    } catch (error) {
      return res.status(500).json({ msg: error.message }, { isRead: true });
    }
  },
  deleteAllNotifies: async (req, res) => {
    try {
      const notifies = await Notifies.deleteMany({
        recipients: req.user._id,
      });

      return res.status(200).json({ msg: "Delete all success.", notifies });
    } catch (error) {
      return res.status(500).json({ msg: error.message }, { isRead: true });
    }
  },
};

module.exports = notifyController;
