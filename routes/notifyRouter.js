const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const notifyController = require("../controllers/notifyController");

router.post("/notify", authMiddleware, notifyController.createNotify);
router.delete("/notify/:id", authMiddleware, notifyController.removeNotify);
router.get("/notifies", authMiddleware, notifyController.getNotifies);
router.patch(
  "/isReadNotify/:id",
  authMiddleware,
  notifyController.isReadNotify
);
router.delete(
  "/deleteAllNotify",
  authMiddleware,
  notifyController.deleteAllNotifies
);
module.exports = router;
