import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ReviewService = {

      getReviews: async (bookId) => {
            try {
                  const response = await axios.get(`${API_BASE_URL}/reviews/${bookId}`);
                  return response.data;
            } catch (error) {
                  throw new Error(error.response?.data?.message || "Failed to fetch reviews");
            }
      },


      addReview: async (bookId, userId, reviewText, rating) => {
            try {
                  const token = localStorage.getItem("token");
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
                                    Authorization: `Bearer ${token}`,
                              },
                        }
                  );
                  return response.data;
            } catch (error) {
                  throw new Error(error.response?.data?.message || "Failed to add review");
            }
      },
};

export default ReviewService;
