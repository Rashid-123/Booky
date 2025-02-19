import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const getFeaturedBooks = async () => {
      try {
            const response = await axios.get(`${API_BASE_URL}/books/featured`);
            return response.data;
      } catch (error) {
            console.error("Error fetching featured books:", error);
            throw error;
      }
};


// const getAllBooks = async () => {
//       try {
//             const response = await axios.get(`${API_BASE_URL}/books`);
//             return response.data;
//       } catch (error) {
//             console.error("Error fetching all books:", error);
//             throw error;
//       }
// };

const getAllBooks = async (page = 1, limit = 8) => {
      try {
            const response = await axios.get(`${API_BASE_URL}/books?page=${page}&limit=${limit}`);
            return response.data;
      } catch (error) {
            console.error("Error fetching books:", error);
            return { books: [], totalPages: 1 }; // Return default values on error
      }
};


const getBookById = async (id) => {
      try {
            const response = await axios.get(`${API_BASE_URL}/books/${id}`);
            return response.data;
      } catch (error) {
            console.error("Error fetching book by ID:", error);
            throw error;
      }
};



export { getFeaturedBooks, getAllBooks, getBookById };