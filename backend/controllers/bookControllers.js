const Book = require("../models/Book");
const Review = require("../models/Review");


exports.getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;


    const books = await Book.find()
      .populate("reviews")
      .skip(skip)
      .limit(limit);


    const totalBooks = await Book.countDocuments();

    res.json({
      books,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books", error: error.message });
  }
};


exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Manually fetch reviews related to this book
    const reviews = await Review.find({ bookId: book._id }).populate("userId", "name email");

    res.json({ ...book.toObject(), reviews }); // Combine book data with reviews manually
  } catch (error) {
    res.status(500).json({ message: "Error retrieving book", error: error.message });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, author, description, category, rating = 0 } = req.body;

    if (!title || !author || !description || !category) {
      return res.status(400).json({ message: "All fields except rating are required" });
    }

    const book = new Book({
      title,
      author,
      description,
      category: Array.isArray(category) ? category : [category],
      rating,
      averageRating: rating,
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error: error.message });
  }
};

exports.addFeatured = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.featured = true;
    await book.save();

    res.status(200).json({ message: "Book marked as featured", book });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getFeaturedBooks = async (req, res) => {
  try {
    // Fetch books where featured is true
    const featuredBooks = await Book.find({ featured: true }).populate("reviews");

    // Check if any featured books exist
    if (featuredBooks.length === 0) {
      return res.status(404).json({ message: "No featured books found" });
    }

    // Return the featured books
    res.status(200).json(featuredBooks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch featured books", error: error.message });
  }
};