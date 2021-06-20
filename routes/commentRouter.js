const router = require("express").Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/comment", authMiddleware, commentController.createComment);

module.exports = router;
