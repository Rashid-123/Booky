const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    category: [{ type: String, required: true }], // Array for multiple categories

    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // References to reviews
    averageRating: { type: Number, default: 0 }, // Helps with performance
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);


const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
