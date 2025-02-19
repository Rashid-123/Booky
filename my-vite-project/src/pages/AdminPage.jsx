import { useState } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import adminService from '../services/adminService';

const AdminPage = () => {
      const [title, setTitle] = useState('');
      const [author, setAuthor] = useState('');
      const [description, setDescription] = useState('');

      const [category, setCategory] = useState('');
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');

      const categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Fantasy', 'Biography', 'Productivity'];

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);

            const token = localStorage.getItem('token');

            if (!token) {
                  setError('You must be logged in to add a book.');
                  setLoading(false);
                  return;
            }

            try {
                  await adminService.addBook({ title, author, description, category }, token);
                  alert('Book added successfully');
                  setTitle('');
                  setAuthor('');
                  setDescription('');

                  setCategory('');
            } catch (error) {
                  setError(error.message);
            } finally {
                  setLoading(false);
            }
      };

      return (
            <Box sx={{ padding: 2 }}>
                  <Typography variant="h5" gutterBottom>Add New Book</Typography>
                  {error && <Typography color="error">{error}</Typography>}
                  <form onSubmit={handleSubmit}>
                        <TextField
                              label="Book Title"
                              fullWidth
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              required
                              sx={{ marginBottom: 2 }}
                        />
                        <TextField
                              label="Author"
                              fullWidth
                              value={author}
                              onChange={(e) => setAuthor(e.target.value)}
                              required
                              sx={{ marginBottom: 2 }}
                        />
                        <TextField
                              label="Description"
                              fullWidth
                              multiline
                              rows={4}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              required
                              sx={{ marginBottom: 2 }}
                        />


                        {/* Category Dropdown */}
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                              <InputLabel>Category</InputLabel>
                              <Select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                              >
                                    {categories.map((cat, index) => (
                                          <MenuItem key={index} value={cat}>
                                                {cat}
                                          </MenuItem>
                                    ))}
                              </Select>
                        </FormControl>

                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                              {loading ? 'Adding...' : 'Add Book'}
                        </Button>
                  </form>
            </Box>
      );
};

export default AdminPage;
