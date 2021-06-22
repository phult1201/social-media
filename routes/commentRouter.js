const router = require("express").Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/comment", authMiddleware, commentController.createComment);
router.patch("/comment/:id", authMiddleware, commentController.updateComment);
router.patch(
  "/comment/:id/like",
  authMiddleware,
  commentController.likeComment
);
router.patch(
  "/comment/:id/unlike",
  authMiddleware,
  commentController.unLikeComment
);

module.exports = router;
