const mongoose = require('mongoose');
require('dotenv').config();
const Career = require('./models/Career');

const data = [
  {
    title: "Frontend Developer",
    description: "Build UIs with HTML/CSS/JS and modern frameworks.",
    sections: [
      { name: "Basics", items: [{ id: "f-html", title: "HTML" }, { id: "f-css", title: "CSS" }, { id: "f-js", title: "JavaScript" }] },
      { name: "Frameworks", items: [{ id: "f-react", title: "React" }, { id: "f-vue", title: "Vue" }] }
    ]
  },
  {
    title: "AI Engineer",
    description: "Learn ML, DL and build AI systems.",
    sections: [
      { name: "Foundations", items: [{ id: "a-python", title: "Python" }, { id: "a-prob", title: "Probability" }] },
      { name: "ML", items: [{ id: "a-ml", title: "Machine Learning" }, { id: "a-dl", title: "Deep Learning" }] }
    ]
  }
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Career.deleteMany({});
  await Career.insertMany(data);
  console.log('Seeded careers');
  process.exit(0);
})();
