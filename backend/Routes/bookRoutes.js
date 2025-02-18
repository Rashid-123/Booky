const express = require("express");
const {
  getBooks,
  getBookById,
  addBook,
  addFeatured,
  getFeaturedBooks,
} = require("../controllers/bookControllers");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();
router.get("/", getBooks);
router.get("/featured", getFeaturedBooks)
router.get("/:id", getBookById);
router.post("/", protect, admin, addBook);
router.post("/featured/:id", protect, admin, addFeatured)

module.exports = router;
