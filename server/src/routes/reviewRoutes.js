const express = require('express');
const router = express.Router();        

const{getReviews ,addReview} = require('../controllers/reviewController');

const { protect } = require('../middleware/authMiddleware');

router.get('/:bookId', protect, getReviews);
router.post('/:bookId', protect, addReview);    

module.exports = router;