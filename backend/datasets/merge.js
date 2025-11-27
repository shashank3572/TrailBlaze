const fs = require("fs");
const path = require("path");

const folderPath = __dirname;

const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".json") && f !== "careers.json");

let output = [];

console.log("\n📂 Checking files...\n");

files.forEach(file => {
  const filePath = path.join(folderPath, file);
  const content = fs.readFileSync(filePath, "utf8");

  try {
    const parsed = JSON.parse(content);
    output.push(parsed);
    console.log("✅ OK:", file);
  } catch (err) {
    console.log("❌ ERROR in:", file);
    console.log("   ➤", err.message);
  }
});

fs.writeFileSync(path.join(folderPath, "careers.json"), JSON.stringify(output, null, 2));

console.log("\n✨ Done. careers.json created (invalid files ignored).");
