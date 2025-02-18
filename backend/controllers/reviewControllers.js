const Review = require("../models/Review");
const Book = require("../models/Book");

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId }).populate("userId", "name");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};


exports.addReview = async (req, res) => {
  try {
    const { bookId, userId, reviewText, rating } = req.body;
    console.log("in try");

    // Find the book
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Create and save the new review
    const newReview = new Review({ bookId, userId, reviewText, rating });
    await newReview.save();

    // Push the review into the book's `reviews` array
    book.reviews.push(newReview._id);

    // Calculate the new average rating directly
    const currentTotalRating = book.averageRating * (book.reviews.length - 1); // Subtract the new review's rating
    const newAverageRating = (currentTotalRating + rating) / book.reviews.length;

    // Update the book's averageRating
    book.averageRating = newAverageRating;

    // Save the updated book
    await book.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "You have already submitted a review", error: error.message });
  }
};