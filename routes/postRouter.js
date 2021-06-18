const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const postController = require("../controllers/postController");

router
  .route("/posts")
  .get(authMiddleware, postController.getPost)
  .post(authMiddleware, postController.createPost);

router.route("/post/:id").patch(authMiddleware, postController.updatePost);

router.route("/post/:id/like").patch(authMiddleware, postController.likePost);
router
  .route("/post/:id/unlike")
  .patch(authMiddleware, postController.unLikePost);

module.exports = router;
