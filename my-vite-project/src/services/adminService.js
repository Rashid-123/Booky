
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const addBook = async (bookData, token) => {
      try {
            const response = await axios.post(
                  `${API_BASE_URL}/books/`,
                  bookData,
                  {
                        headers: {
                              Authorization: `Bearer ${token}`,
                        },
                  }
            );
            return response.data;
      } catch (error) {
            throw new Error('Failed to add book: ' + error.message);
      }
};

export default { addBook };
