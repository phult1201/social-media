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
  .get(authMiddleware, postController.getPost)
  .delete(authMiddleware, postController.deletePost);

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

router.route("/savePost/:id").patch(authMiddleware, postController.savePost);

router
  .route("/unsavePost/:id")
  .patch(authMiddleware, postController.unsavePost);

router.route(`/getSavePosts`).get(authMiddleware, postController.getSavePosts);

module.exports = router;
