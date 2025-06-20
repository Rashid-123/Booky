const prisma = require('../../prisma/db');

// ------------------------------------------- Get reviews for a book by bookId -----------------------------------
exports.getReviews = async (req, res) => {
  try {
    const { bookId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    
    if (!bookId || !Number.isInteger(parseInt(bookId)) || parseInt(bookId) <= 0) {
      return res.status(400).json({ message: "Valid bookId is required" });
    }

    if (page < 1) {
      return res.status(400).json({ message: "Page must be a positive integer" });
    }

    if (limit < 1 || limit > 50) {
      return res.status(400).json({ 
        message: "Limit must be between 1 and 50" 
      });
    }

    
    const book = await prisma.book.findUnique({
      where: { id: parseInt(bookId) },
      select: { id: true, title: true }
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const reviews = await prisma.review.findMany({
      where: { bookId: parseInt(bookId) },
      skip: (page - 1) * limit,
      take: limit,
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
    });

    const totalReviews = await prisma.review.count({
      where: { bookId: parseInt(bookId) }
    });

   
    const ratings = await prisma.review.findMany({
      where: { bookId: parseInt(bookId) },
      select: { rating: true }
    });

    const averageRating = ratings.length > 0 
      ? ratings.reduce((sum, review) => sum + review.rating, 0) / ratings.length
      : 0;

    res.json({
      book,
      reviews,
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      totalReviews,
      totalPages: Math.ceil(totalReviews / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Get reviews error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//-------------------------- Add a review for a book by bookId --------------------------------------
exports.addReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { content, rating } = req.body;

    // Validation
    if (!bookId || !Number.isInteger(parseInt(bookId)) || parseInt(bookId) <= 0) {
      return res.status(400).json({ message: "Valid bookId is required" });
    }

    if (!content || !rating) {
      return res.status(400).json({ 
        message: "Content and rating are required" 
      });
    }

    if (typeof content !== 'string' || content.trim().length < 10) {
      return res.status(400).json({ 
        message: "Content must be at least 10 characters long" 
      });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ 
        message: "Rating must be an integer between 1 and 5" 
      });
    }

 
    const book = await prisma.book.findUnique({
      where: { id: parseInt(bookId) }
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

  
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: req.user.id,
        bookId: parseInt(bookId)
      }
    });

    if (existingReview) {
      return res.status(400).json({ 
        message: "You have already reviewed this book" 
      });
    }

    const review = await prisma.review.create({
      data: {
        content: content.trim(),
        rating: rating,
        userId: req.user.id,
        bookId: parseInt(bookId)
      },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        },
        book: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    res.status(201).json({ 
      message: "Review added successfully", 
      review 
    });
  } catch (err) {
    console.error('Add review error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};