const Notifies = require("../models/notifyModel");

const notifyController = {
  createNotify: async (req, res) => {
    try {
      const { id, recipients, url, text, content, image } = req.body;

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
};

module.exports = notifyController;
