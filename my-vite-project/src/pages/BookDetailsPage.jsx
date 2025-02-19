import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Rating, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from "@mui/material";
import { getBookById } from "../services/bookService";
import ReviewForm from "../components/ReviewForm";

const BookDetailsPage = () => {
      const { id } = useParams();
      const navigate = useNavigate();
      const [book, setBook] = useState(null);
      const [loading, setLoading] = useState(true);
      const [openReviewDialog, setOpenReviewDialog] = useState(false);
      const [user, setUser] = useState(null);

      useEffect(() => {
            const fetchBook = async () => {
                  setLoading(true);
                  try {
                        const data = await getBookById(id);
                        setBook(data);
                  } catch (error) {
                        console.error("Error fetching book:", error);
                  } finally {
                        setLoading(false);
                  }
            };
            fetchBook();
      }, [id]);

      useEffect(() => {
            const loggedInUser = localStorage.getItem("user");
            if (loggedInUser) {
                  setUser(JSON.parse(loggedInUser));
            }
      }, []);

      const handleReviewDialogOpen = () => {
            if (user) {
                  setOpenReviewDialog(true);
            } else {
                  navigate("/login");
            }
      };

      const handleReviewDialogClose = () => setOpenReviewDialog(false);

      if (loading)
            return (
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                        <CircularProgress />
                  </Box>
            );

      if (!book) return <Typography variant="h6">Book not found.</Typography>;

      return (
            <Box sx={{ padding: 3 }}>
                  <Typography variant="h4" gutterBottom>{book.title}</Typography>
                  <Typography variant="subtitle1" gutterBottom>by {book.author}</Typography>
                  <Typography variant="body1" gutterBottom>{book.description}</Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 2 }}>
                        <Typography variant="h6">Average Rating:</Typography>
                        <Rating value={book.averageRating || 0} precision={0.5} readOnly sx={{ ml: 1 }} />
                        <Typography variant="body1" sx={{ ml: 1 }}>
                              ({book.averageRating ? book.averageRating.toFixed(1) : "No ratings"})
                        </Typography>
                  </Box>

                  <Box sx={{ mt: 4 }}>
                        <Typography variant="h5">Reviews</Typography>
                        {book.reviews.length === 0 ? (
                              <Typography variant="body1">No reviews yet.</Typography>
                        ) : (
                              book.reviews.map((review) => (
                                    <Card key={review._id} sx={{ mt: 2 }}>
                                          <CardContent>
                                                <Typography variant="body1">{review.reviewText}</Typography>
                                                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                                      <Rating value={review.rating} precision={0.5} readOnly />
                                                      <Typography variant="body2" sx={{ ml: 1 }}>
                                                            by {review.userId.name} on {new Date(review.createdAt).toLocaleDateString()}
                                                      </Typography>
                                                </Box>
                                          </CardContent>
                                    </Card>
                              ))
                        )}
                  </Box>

                  <Box sx={{ mt: 3 }}>
                        <Button variant="contained" color="primary" onClick={handleReviewDialogOpen}>
                              Add Review
                        </Button>
                  </Box>

                  <Dialog open={openReviewDialog} onClose={handleReviewDialogClose}>
                        <DialogTitle>Submit your review</DialogTitle>
                        <DialogContent>
                              <ReviewForm bookId={id} userId={user?._id} />
                        </DialogContent>
                        <DialogActions>
                              <Button onClick={handleReviewDialogClose} color="secondary">Cancel</Button>
                        </DialogActions>
                  </Dialog>
            </Box>
      );
};

export default BookDetailsPage;
