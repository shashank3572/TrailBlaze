// src/data/roadmapData.js
const roadmapData = {
  "Full Stack Developer": {
    description:
      "End-to-end web development: build both frontend and backend applications, manage databases, and deploy full systems.",
    sections: [
      {
        title: "Foundations",
        items: [
          { text: "Internet, HTTP/HTTPS, REST", link: "https://developer.mozilla.org/" },
          { text: "Git & GitHub Basics", link: "https://try.github.io/" },
        ],
      },
      {
        title: "Frontend Development",
        items: [
          { text: "HTML semantics & forms", link: "https://roadmap.sh/frontend" },
          { text: "CSS (layout, Flex/Grid)", link: "https://web.dev/learn/css/" },
          { text: "JavaScript (ES6+)", link: "https://javascript.info/" },
          { text: "React (Hooks, Router)", link: "https://react.dev/" },
        ],
      },
      {
        title: "Backend Development",
        items: [
          { text: "Node.js & npm", link: "https://nodejs.org/en/learn" },
          { text: "Express (routes, middleware)", link: "https://expressjs.com/en/guide/routing.html" },
          { text: "MongoDB & Mongoose", link: "https://www.mongodb.com/docs/" },
          { text: "Auth (JWT) & CORS", link: "https://jwt.io/introduction" },
        ],
      },
      {
        title: "Deployment",
        items: [
          { text: "Build & Environment Variables", link: "https://roadmap.sh/devops" },
          { text: "Deploy (Render / Netlify / Vercel)", link: "https://youtu.be/SmKHxAz9fhw" },
        ],
      },
    ],
  },

  "Data Scientist": {
    description:
      "Work with data, statistics, and machine learning to build actionable insights and predictive models.",
    sections: [
      {
        title: "Foundations",
        items: [
          { text: "Python (NumPy, Pandas)", link: "https://pandas.pydata.org/docs/" },
          { text: "Statistics & Probability", link: "https://seeing-theory.brown.edu/" },
        ],
      },
      {
        title: "Visualization & EDA",
        items: [
          { text: "Matplotlib / Plotly", link: "https://matplotlib.org/stable/index.html" },
          { text: "Exploratory Data Analysis (EDA)", link: "https://www.kaggle.com/learn" },
        ],
      },
      {
        title: "Machine Learning",
        items: [
          { text: "Scikit-Learn (Regression & Classification)", link: "https://scikit-learn.org/stable/" },
          { text: "Model Evaluation & Metrics", link: "https://youtu.be/7x0-t-U8kok" },
          { text: "Feature Engineering", link: "https://youtu.be/UkzFI9rgwfU" },
        ],
      },
      {
        title: "Practice",
        items: [
          { text: "Kaggle Projects", link: "https://www.kaggle.com/" },
          { text: "Portfolio Notebooks", link: "" },
        ],
      },
    ],
  },

  "AI/ML Engineer": {
    description:
      "Design, train, and deploy AI models. Focus on data pipelines, neural networks, and production-grade ML systems.",
    sections: [
      {
        title: "Math & Python",
        items: [
          { text: "Linear Algebra & Calculus (basics)", link: "https://www.3blue1brown.com/" },
          { text: "Python + NumPy", link: "https://numpy.org/learn/" },
        ],
      },
      {
        title: "Core Machine Learning",
        items: [
          { text: "Classical ML (Scikit-Learn)", link: "https://scikit-learn.org/stable/" },
          { text: "Neural Networks (PyTorch / TensorFlow)", link: "https://pytorch.org/tutorials/" },
        ],
      },
      {
        title: "MLOps & Deployment",
        items: [
          { text: "Data Versioning & Pipelines", link: "https://www.dvc.org/" },
          { text: "Model Serving (FastAPI, Docker)", link: "https://fastapi.tiangolo.com/" },
        ],
      },
      {
        title: "LLMs & Advanced Topics",
        items: [
          { text: "Prompt Engineering", link: "https://youtu.be/4Bdc55j80l8" },
          { text: "Vector Databases & RAG Basics", link: "" },
        ],
      },
    ],
  },

  "Product/Project Manager": {
    description:
      "Lead cross-functional teams to plan, prioritize, and deliver successful products using agile methodologies.",
    sections: [
      {
        title: "Core Skills",
        items: [
          { text: "Agile / Scrum Basics", link: "https://youtu.be/9oHY9mSCvFM" },
          { text: "User Research & PRDs", link: "" },
        ],
      },
      {
        title: "Delivery & Communication",
        items: [
          { text: "Roadmapping & Prioritization", link: "" },
          { text: "Stakeholder Communication", link: "" },
        ],
      },
      {
        title: "Analytics & Metrics",
        items: [
          { text: "KPIs & Product Analytics", link: "" },
          { text: "A/B Testing Basics", link: "" },
        ],
      },
      {
        title: "Tools",
        items: [
          { text: "Jira Basics", link: "https://youtu.be/A7p0tdHnISA" },
          { text: "Project Planning Tools", link: "https://asana.com/" },
        ],
      },
    ],
  },

  "Digital Marketing": {
    description:
      "Grow audiences and revenue using SEO, content, ads, and data-driven marketing strategies.",
    sections: [
      {
        title: "Foundations",
        items: [
          { text: "SEO Fundamentals", link: "https://youtu.be/1Suj8k9S0d4" },
          { text: "Content Strategy", link: "https://youtu.be/JUWXh0tVseo" },
        ],
      },
      {
        title: "Channels",
        items: [
          { text: "Social Media Marketing", link: "" },
          { text: "Email Marketing & Funnels", link: "" },
        ],
      },
      {
        title: "Analytics",
        items: [
          { text: "Google Analytics Basics", link: "" },
          { text: "Attribution & ROI", link: "" },
        ],
      },
    ],
  },
};

export default roadmapData;
