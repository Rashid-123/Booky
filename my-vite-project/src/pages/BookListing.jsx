// import { useEffect, useState } from "react";
// import { Grid, Card, CardContent, Typography, Button, Box, Rating } from "@mui/material";
// import { getAllBooks } from "../services/bookService";
// import { Link } from "react-router-dom";
// const BookListing = () => {
//       const [books, setBooks] = useState([]);
//       const [loading, setLoading] = useState(true);

//       useEffect(() => {
//             const loadBooks = async () => {
//                   try {
//                         const data = await getAllBooks();
//                         setBooks(data);
//                   } catch (error) {
//                         console.error("Error fetching books:", error);
//                   } finally {
//                         setLoading(false);
//                   }
//             };
//             loadBooks();
//       }, []);

//       if (loading) return <Typography variant="h6">Loading books...</Typography>;

//       return (
//             <Box sx={{ padding: 2 }}>
//                   <Grid container spacing={2}>
//                         {books.map((book) => (
//                               <Grid item xs={12} sm={6} md={4} key={book._id}>
//                                     <Card sx={{
//                                           height: "100%", display: "flex", flexDirection: "column", transition: "transform 0.3s, box-shadow 0.3s",
//                                           "&:hover": {
//                                                 transform: "scale(1.05)",
//                                                 boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
//                                           },
//                                     }}>
//                                           <CardContent sx={{ flexGrow: 1 }}>
//                                                 <Typography variant="h6" gutterBottom>
//                                                       {book.title}
//                                                 </Typography>
//                                                 <Typography variant="body2" color="textSecondary" gutterBottom>
//                                                       by {book.author}
//                                                 </Typography>
//                                                 <Typography variant="body2" color="textSecondary" gutterBottom>
//                                                       {book.description.substring(0, 100)}...
//                                                 </Typography>

//                                                 {/* Display Rating */}
//                                                 <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                                                       <Rating
//                                                             value={book.averageRating || 0} // Default to 0 if averageRating is missing
//                                                             precision={0.5} // Allow half-star ratings
//                                                             readOnly // Make the rating non-editable
//                                                       />
//                                                       <Typography variant="body2" sx={{ ml: 1 }}>
//                                                             ({book.averageRating ? book.averageRating.toFixed(1) : "No ratings"})
//                                                       </Typography>
//                                                 </Box>

//                                                 <Button
//                                                       variant="contained"
//                                                       color="primary"
//                                                       component={Link}
//                                                       to={`/books/${book._id}`} // Navigate to the book details page
//                                                       sx={{ mt: 2 }}
//                                                 >
//                                                       View Details
//                                                 </Button>
//                                           </CardContent>
//                                     </Card>
//                               </Grid>
//                         ))}
//                   </Grid>
//             </Box>
//       );
// };

// export default BookListing;



import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button, Box, Rating } from "@mui/material";
import { getAllBooks } from "../services/bookService";
import { Link } from "react-router-dom";

const BookListing = () => {
      const [books, setBooks] = useState([]);
      const [loading, setLoading] = useState(true);
      const [page, setPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const limit = 6;

      useEffect(() => {
            const loadBooks = async () => {
                  setLoading(true);
                  try {
                        const data = await getAllBooks(page, limit);
                        setBooks(data.books);
                        setTotalPages(data.totalPages);
                  } catch (error) {
                        console.error("Error fetching books:", error);
                  } finally {
                        setLoading(false);
                  }
            };
            loadBooks();
      }, [page]);

      if (loading) return <Typography variant="h6">Loading books...</Typography>;

      return (
            <Box sx={{ padding: 2 }}>
                  <Grid container spacing={4}>
                        {books.map((book) => (
                              <Grid item xs={12} sm={6} md={4} key={book._id}>
                                    <Card
                                          sx={{
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                transition: "transform 0.3s, box-shadow 0.3s",
                                                "&:hover": { transform: "scale(1.05)", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)" },
                                          }}
                                    >
                                          <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="h6" gutterBottom>{book.title}</Typography>
                                                <Typography variant="body2" color="textSecondary" gutterBottom>by {book.author}</Typography>
                                                <Typography variant="body2" color="textSecondary" gutterBottom>{book.description.substring(0, 100)}...</Typography>

                                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                                      <Rating value={book.averageRating || 0} precision={0.5} readOnly />
                                                      <Typography variant="body2" sx={{ ml: 1 }}>
                                                            ({book.averageRating ? book.averageRating.toFixed(1) : "No ratings"})
                                                      </Typography>
                                                </Box>

                                                <Button variant="contained" color="primary" component={Link} to={`/books/${book._id}`} sx={{ mt: 2 }}>
                                                      View Details
                                                </Button>
                                          </CardContent>
                                    </Card>
                              </Grid>
                        ))}
                  </Grid>


                  <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
                        <Button
                              variant="contained"
                              size="small"
                              disabled={page === 1}
                              onClick={() => setPage(page - 1)}
                              sx={{ minWidth: "auto", px: 1, py: 0.1 }}
                        >
                              Previous
                        </Button>

                        <Typography sx={{ minWidth: "auto", px: 0.5, py: 0.2 }} variant="body2">Page {page} of {totalPages}</Typography>

                        <Button
                              variant="contained"
                              size="small"
                              disabled={page === totalPages}
                              onClick={() => setPage(page + 1)}
                              sx={{ minWidth: "auto", px: 1, py: 0.1 }}
                        >
                              Next
                        </Button>
                  </Box>

            </Box>
      );
};

export default BookListing;
