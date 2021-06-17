const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const postController = require("../controllers/postController");

router
  .route("/posts")
  .get(authMiddleware, postController.getPost)
  .post(authMiddleware, postController.createPost);

module.exports = router;
