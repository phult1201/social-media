const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const postController = require("../controllers/postController");

router
  .route("/posts")
  .get(authMiddleware, postController.getPosts)
  .post(authMiddleware, postController.createPost);

router
  .route("/post/:id")
  .patch(authMiddleware, postController.updatePost)
  .get(authMiddleware, postController.getPost);

router.route("/post/:id/like").patch(authMiddleware, postController.likePost);

router
  .route("/post/:id/unlike")
  .patch(authMiddleware, postController.unLikePost);

router
  .route("/user_posts/:id")
  .get(authMiddleware, postController.getUserPosts);

router
  .route("/post_discover")
  .get(authMiddleware, postController.getPostsDiscover);

module.exports = router;
