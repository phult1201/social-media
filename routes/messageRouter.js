const router = require("express").Router();
const messageController = require("../controllers/messageController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get(
  "/conversations",
  authMiddleware,
  messageController.getConversations
);

router.get("/messages/:id", authMiddleware, messageController.getMessages);
router.post("/message", authMiddleware, messageController.createMessage);
router.delete("/message/:id", authMiddleware, messageController.deleteMessage);

module.exports = router;
