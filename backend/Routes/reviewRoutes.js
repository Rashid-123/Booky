const express = require("express");
const { getReviews, addReview } = require("../controllers/reviewControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();
router.get("/:bookId", getReviews);
router.post("/", protect, addReview);
module.exports = router;
