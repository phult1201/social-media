const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const notifyController = require("../controllers/notifyController");

router.post("/notify", authMiddleware, notifyController.createNotify);
router.delete("/notify/:id", authMiddleware, notifyController.removeNotify);

module.exports = router;
