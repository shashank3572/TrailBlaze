const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { sendToML } = require("../controllers/mlBridgeController");

router.get("/test", auth, sendToML);

module.exports = router;
