// components/ReviewForm.jsx
import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import ReviewService from '../services/reviewService';

const ReviewForm = ({ bookId, userId }) => {
      const [reviewText, setReviewText] = useState('');
      const [rating, setRating] = useState(1);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                  const reviewData = await ReviewService.addReview(bookId, userId, reviewText, rating);
                  alert('Review submitted successfully');
                  setReviewText('');
                  setRating(1);
            } catch (error) {
                  setError(error.message);
            } finally {
                  setLoading(false);
            }
      };

      return (
            <Box sx={{ padding: 2 }}>
                  <Typography variant="h6">Submit your review</Typography>
                  {error && <Typography color="error">{error}</Typography>}
                  <form onSubmit={handleSubmit}>
                        <TextField
                              label="Review"
                              fullWidth
                              multiline
                              rows={4}
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              required
                              sx={{ marginBottom: 2 }}
                        />
                        <TextField
                              label="Rating"
                              type="number"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                              inputProps={{ min: 1, max: 5 }}
                              required
                              sx={{ marginBottom: 2 }}
                        />
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                              {loading ? 'Submitting...' : 'Submit Review'}
                        </Button>
                  </form>
            </Box>
      );
};

export default ReviewForm;
