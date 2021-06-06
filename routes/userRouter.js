const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.get("/search", authMiddleware, userController.searchUsers);

module.exports = router;
