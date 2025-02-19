import { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Rating, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getFeaturedBooks } from "../services/bookService";

const HomePage = () => {
      const [featuredBooks, setFeaturedBooks] = useState([]);

      useEffect(() => {
            const fetchFeaturedBooks = async () => {
                  try {
                        const books = await getFeaturedBooks();
                        setFeaturedBooks(books);
                  } catch (error) {
                        console.error("Error fetching featured books:", error);
                  }
            };
            fetchFeaturedBooks();
      }, []);

      return (
            <Container sx={{ py: 4 }}>
                  <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}>
                        Featured
                  </Typography>



                  <Grid container spacing={4}>
                        {featuredBooks.map((book) => (
                              <Grid item key={book._id} xs={12} sm={6} md={4}>
                                    <Card
                                          sx={{
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                transition: "transform 0.3s, box-shadow 0.3s",
                                                "&:hover": {
                                                      transform: "scale(1.05)",
                                                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                                                },
                                          }}
                                    >
                                          <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
                                                      {book.title}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                                      by {book.author}
                                                </Typography>
                                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                                      <Rating value={book.averageRating} precision={0.5} readOnly />
                                                      <Typography variant="body2" sx={{ ml: 1 }}>
                                                            ({book.averageRating.toFixed(1)})
                                                      </Typography>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                                      {book.description.substring(0, 100)}...
                                                </Typography>


                                                <Button
                                                      variant="contained"
                                                      color="primary"
                                                      component={Link}
                                                      to={`/books/${book._id}`}
                                                      sx={{ mt: 2 }}
                                                >
                                                      View Details
                                                </Button>
                                          </CardContent>
                                    </Card>
                              </Grid>
                        ))}
                  </Grid>
            </Container>
      );
};

export default HomePage;