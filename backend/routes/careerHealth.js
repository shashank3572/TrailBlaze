const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/careerHealthController");

router.get("/:careerId", auth, ctrl.getScore);

module.exports = router;
