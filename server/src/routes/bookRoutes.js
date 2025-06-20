const express = require('express');
const router = express.Router();
const {getallBooks , getBook, getBooksByCategory } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getallBooks);
router.get('/category',protect, getBooksByCategory);

router.get("/:id" ,   protect, getBook );



module.exports = router;