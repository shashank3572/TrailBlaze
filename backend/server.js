const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- DB Connect ---
connectDB();

// --- Routes ---
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/userRoutes"));
app.use("/careers", require("./routes/careers"));
app.use("/ai", require("./routes/ai")); // <-- IMPORTANT LINE

// --- Test Root ---
app.get("/", (req, res) => {
  res.send("TrailBlaze API running...");
});

app.use("/courses", require("./routes/course"));

app.use("/ml", require("./routes/ml"));
app.use("/api/progress", require("./routes/progress"));
app.use("/api/weekly-tasks", require("./routes/weeklyTasks"));
app.use("/api/career-health", require("./routes/careerHealth"));




// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
