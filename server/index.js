require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes    = require('./src/routes/authRoutes');
const bookRoutes = require('./src/routes/bookRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');      

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));


app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});


app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Book Review API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);



// Start server
const server = app.listen(port, () => {
  console.log(`
 Server running on: http://localhost:${port}
`);
});

module.exports = app;