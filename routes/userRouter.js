const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.get("/search", authMiddleware, userController.searchUsers);
router.get("/user/:id", authMiddleware, userController.getUser);
router.patch("/user", authMiddleware, userController.updateUser);

module.exports = router;
