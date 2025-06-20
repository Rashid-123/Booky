const express = require('express');
const router = express.Router();

const { addBook } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/add-book', protect, adminOnly, addBook);

module.exports = router;