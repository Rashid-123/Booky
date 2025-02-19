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

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const newReview = new Review({ bookId, userId, reviewText, rating });
    await newReview.save();

    // Ensure averageRating and totalReviews are numbers
    const totalReviews = Number(book.reviews.length); // Convert to number
    console.log("Total Reviews:", totalReviews);

    const currentAverageRating = Number(book.averageRating) || 0; // Convert to number, default 0
    console.log("Current Average Rating:", currentAverageRating);

    const currentTotalRating = currentAverageRating * totalReviews;
    console.log("Current Total Rating:", currentTotalRating);

    const newAverageRating = (currentTotalRating + Number(rating)) / (totalReviews + 1);
    console.log("New Average Rating:", newAverageRating);

    // Update book details
    book.reviews.push(newReview._id);
    book.averageRating = newAverageRating;
    console.log("Updated Book Average Rating:", book.averageRating);

    await book.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
};
