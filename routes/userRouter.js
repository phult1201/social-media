const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.get("/search", authMiddleware, userController.searchUsers);
router.get("/user/:id", authMiddleware, userController.getUser);
router.patch("/user", authMiddleware, userController.updateUser);
router.patch("/user/:id/follow", authMiddleware, userController.follow);
router.patch("/user/:id/unfollow", authMiddleware, userController.unfollow);
router.get("/suggestions", authMiddleware, userController.suggestionsUser);

module.exports = router;
