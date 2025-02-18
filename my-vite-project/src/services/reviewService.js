import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use environment variable for base URL

const ReviewService = {
      // Fetch reviews for a specific book by its ID
      getReviews: async (bookId) => {
            try {
                  const response = await axios.get(`${API_BASE_URL}/reviews/${bookId}`);
                  return response.data; // Returns an array of reviews
            } catch (error) {
                  throw new Error(error.response?.data?.message || "Failed to fetch reviews");
            }
      },

      // Add a review for a specific book
      addReview: async (bookId, userId, reviewText, rating) => {
            try {
                  const token = localStorage.getItem("token"); // Get the JWT token from local storage
                  const response = await axios.post(
                        `${API_BASE_URL}/reviews`,
                        {
                              bookId,
                              userId,
                              reviewText,
                              rating,
                        },
                        {
                              headers: {
                                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                              },
                        }
                  );
                  return response.data; // Returns the added review
            } catch (error) {
                  throw new Error(error.response?.data?.message || "Failed to add review");
            }
      },
};

export default ReviewService;
