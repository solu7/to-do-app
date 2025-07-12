const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const tagController = require("../Controllers/tagController");

router.post("/createTag", verifyToken, tagController.createTag);
router.get("/filterForTags", verifyToken, tagController.filterTasksByTags);

module.exports = router;