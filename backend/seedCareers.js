const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const Career = require("./models/Career");

const filePath = path.join(__dirname, "datasets", "careers.json");

(async () => {
  try {
    console.log("📡 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("📁 Reading careers.json...");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const careers = JSON.parse(fileContent);

    console.log(`🗑 Clearing old Career collection...`);
    await Career.deleteMany({});

    console.log(`📥 Inserting ${careers.length} careers...`);
    await Career.insertMany(careers);

    console.log(`✅ SUCCESS: Seeded ${careers.length} careers into database.`);
    process.exit(0);

  } catch (err) {
    console.error("❌ ERROR seeding careers:", err);
    process.exit(1);
  }
})();
