const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/progressController");

router.get("/:careerId", auth, ctrl.getProgress);
router.patch("/:careerId/:stepId", auth, ctrl.updateStep);

module.exports = router;
