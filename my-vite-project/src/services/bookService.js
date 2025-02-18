import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use environment variable for base URL

// Fetch featured books
const getFeaturedBooks = async () => {
      try {
            const response = await axios.get(`${API_BASE_URL}/books/featured`);
            return response.data;
      } catch (error) {
            console.error("Error fetching featured books:", error);
            throw error;
      }
};

// Fetch all books
const getAllBooks = async () => {
      try {
            const response = await axios.get(`${API_BASE_URL}/books`);
            return response.data;
      } catch (error) {
            console.error("Error fetching all books:", error);
            throw error;
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