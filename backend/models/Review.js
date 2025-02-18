const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reviewText: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);


reviewSchema.index({ bookId: 1, userId: 1 }, { unique: true });


const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
