
const prisma = require('../../prisma/db');

// ------------------------------------ Get all books with pagination and average rating---------------------
exports.getallBooks = async (req, res) => {
  try {
   console.log('Get all books request:', req.query);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validation for pagination
    if (page < 1) {
      return res.status(400).json({ message: "Page must be a positive integer" });
    }

    if (limit < 1 || limit > 100) {
      return res.status(400).json({ 
        message: "Limit must be between 1 and 100" 
      });
    }

    const books = await prisma.book.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
        reviews: {
          select: {
            rating: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    //  average rating for each book
    const booksWithRating = books.map(book => ({
      ...book,
      averageRating: book.reviews.length > 0 
        ? book.reviews.reduce((sum, review) => sum + review.rating, 0) / book.reviews.length
        : 0,
      totalReviews: book.reviews.length
    }));

    const totalBooks = await prisma.book.count();

    res.json({
      books: booksWithRating,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
      totalBooks
    });
  } catch (err) {
    console.error('Get all books error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------------------------------- Get a single book by its ID ----------------------------------------
exports.getBook = async (req, res) => {
  try {
    console.log('Get book request:', req.params);
    const { id } = req.params;

   
    if (!id || !Number.isInteger(parseInt(id)) || parseInt(id) <= 0) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    //  average rating
    const averageRating = book.reviews.length > 0 
      ? book.reviews.reduce((sum, review) => sum + review.rating, 0) / book.reviews.length
      : 0;

    res.json({
      ...book,
      averageRating,
      totalReviews: book.reviews.length
    });
  } catch (err) {
    console.error('Get book error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getFeaturedBooks = async (req, res) => { 
  try {
    console.log('Get featured books request:', req.query);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validation for pagination
    if (page < 1) {
      return res.status(400).json({ message: "Page must be a positive integer" });
    }

    if (limit < 1 || limit > 100) {
      return res.status(400).json({ 
        message: "Limit must be between 1 and 100" 
      });
    }

    const featuredBooks = await prisma.book.findMany({
      where: { featured: true },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
        reviews: {
          select: {
            rating: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    //  average rating for each book
    const booksWithRating = featuredBooks.map(book => ({
      ...book,
      averageRating: book.reviews.length > 0 
        ? book.reviews.reduce((sum, review) => sum + review.rating, 0) / book.reviews.length
        : 0,
      totalReviews: book.reviews.length
    }));

    const totalFeaturedBooks = await prisma.book.count({
      where: { featured: true }
    });

    res.json({
      books: booksWithRating,
      totalPages: Math.ceil(totalFeaturedBooks / limit),
      currentPage: page,
      totalBooks: totalFeaturedBooks
    });
  } catch (err) {
    console.error('Get featured books error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
} 


// --------------------------------------------- Get books by category ---------------------------------------------
exports.getBooksByCategory = async (req, res) => {
  try {

    console.log('Get books by category request:', req.query);
    const categoryId = req.query.categoryId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validation
    if (!categoryId || !Number.isInteger(parseInt(categoryId)) || parseInt(categoryId) <= 0) {
      return res.status(400).json({ message: "Valid categoryId is required" });
    }

    if (page < 1) {
      return res.status(400).json({ message: "Page must be a positive integer" });
    }

    if (limit < 1 || limit > 100) {
      return res.status(400).json({ 
        message: "Limit must be between 1 and 100" 
      });
    }

    
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) }
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const books = await prisma.book.findMany({
      where: { categoryId: parseInt(categoryId) },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
        reviews: {
          select: {
            rating: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    //  average rating for each book
    const booksWithRating = books.map(book => ({
      ...book,
      averageRating: book.reviews.length > 0 
        ? book.reviews.reduce((sum, review) => sum + review.rating, 0) / book.reviews.length
        : 0,
      totalReviews: book.reviews.length
    }));

    const totalBooks = await prisma.book.count({
      where: { categoryId: parseInt(categoryId) }
    });

    res.json({
      category,
      books: booksWithRating,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
      totalBooks
    });
  } catch (err) {
    console.error('Get books by category error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};