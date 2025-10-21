const mongoose = require('mongoose'); // talks to MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected'); // yay, database is ready!
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // stop everything if DB is broken
  }
};

module.exports = connectDB;
