// adminController.js
const prisma = require('../../prisma/db');

// ------------------------------------ Add a new book  ------------------------------------
// This function will be used by the admin to add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, description, featured, categoryId } = req.body;

    // Data validation
    if (!title || !author || !description || !categoryId) {
      return res.status(400).json({ 
        message: "Title, author, description, and categoryId are required" 
      });
    }

    if (typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ message: "Title must be a non-empty string" });
    }

    if (typeof author !== 'string' || author.trim().length === 0) {
      return res.status(400).json({ message: "Author must be a non-empty string" });
    }

    if (typeof description !== 'string' || description.trim().length === 0) {
      return res.status(400).json({ message: "Description must be a non-empty string" });
    }

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({ message: "CategoryId must be a positive integer" });
    }

    
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Create the book
    const book = await prisma.book.create({
      data: {
        title: title.trim(),
        author: author.trim(),
        description: description.trim(),
        featured: Boolean(featured),
        categoryId: categoryId
      },
      include: {
        category: true
      }
    });

    res.status(201).json({ 
      message: "Book added successfully", 
      book 
    });

  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};