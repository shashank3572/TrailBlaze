const express = require('express'); // this brings Express (the “engine” for your server)
const cors = require('cors');       // allows your frontend to talk to backend
require('dotenv').config();         // loads secret keys from .env file
const connectDB = require('./config/db'); // connects to MongoDB

const app = express();
app.use(cors());
app.use(express.json()); // so your server can read JSON data

connectDB(); // connect to database

// === ADD THIS LINE BELOW ===
app.use('/api/users', require('./routes/userRoutes'));

// a test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend working!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
