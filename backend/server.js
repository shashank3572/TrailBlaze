const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging (for debugging)
app.use((req, res, next) => {
  console.log(req.method, req.url, req.body);
  next();
});

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use('/api/careers', require('./routes/careers'));
app.use("/api/user", require("./routes/userRoutes"));

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
app.use("/api/ai", require("./routes/ai"));

