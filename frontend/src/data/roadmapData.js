const roadmapData = {
  "Full Stack Developer": {
    description:
      "A complete learning journey from HTML basics to full-stack deployment.",
    sections: [
      {
        title: "1. Web Foundations",
        description: "Learn how the web works and master core web technologies.",
        resources: [
          { text: "HTML & CSS Crash Course", link: "https://youtu.be/mU6anWqZJcc" },
          { text: "JavaScript Basics", link: "https://javascript.info" },
        ],
      },
      {
        title: "2. Frontend Development",
        description: "Learn modern tools and frameworks.",
        resources: [
          { text: "React Official Docs", link: "https://react.dev" },
          { text: "TailwindCSS Docs", link: "https://tailwindcss.com" },
        ],
      },
      {
        title: "3. Backend Development",
        description: "APIs, databases, and authentication.",
        resources: [
          { text: "Node.js Guide", link: "https://nodejs.dev" },
          { text: "MongoDB Docs", link: "https://www.mongodb.com/docs/" },
        ],
      },
      {
        title: "4. DevOps & Deployment",
        description: "Learn how to deploy your apps.",
        resources: [
          { text: "Git & GitHub", link: "https://docs.github.com" },
          { text: "Render Deployment", link: "https://render.com" },
        ],
      },
    ],
  },

  "Data Scientist": {
    description: "Learn data analysis, machine learning, and real-world modelling.",
    sections: [
      {
        title: "1. Python & Math Fundamentals",
        description: "Strong foundations in Python, Maths, Statistics.",
        resources: [
          { text: "Python for Data Science", link: "https://youtu.be/r-uOLxNrNk8" },
          { text: "Statistics Basics", link: "https://www.khanacademy.org/math/statistics-probability" },
        ],
      },
      {
        title: "2. Data Analysis",
        description: "Master data manipulation tools.",
        resources: [
          { text: "Pandas Guide", link: "https://pandas.pydata.org/docs/" },
          { text: "NumPy Guide", link: "https://numpy.org/doc/" },
        ],
      },
      {
        title: "3. Machine Learning",
        description: "Build predictive models.",
        resources: [
          { text: "ML by Andrew Ng", link: "https://youtu.be/UzxYlbK2c7E" },
        ],
      },
    ],
  },

  "AI/ML Engineer": {
    description: "Learn deep learning, neural networks and MLOps basics.",
    sections: [
      {
        title: "1. Python + Math",
        description: "Linear algebra, calculus, probability.",
        resources: [
          { text: "Math for ML", link: "https://www.youtube.com/watch?v=Ilg3gGewQ5U" },
        ],
      },
      {
        title: "2. Deep Learning",
        description: "Neural networks, CNNs, RNNs.",
        resources: [
          { text: "DeepLearning.ai", link: "https://www.deeplearning.ai/" },
        ],
      },
      {
        title: "3. Tools & Frameworks",
        description: "TensorFlow, PyTorch, Scikit-learn.",
        resources: [
          { text: "PyTorch Docs", link: "https://pytorch.org" },
        ],
      },
    ],
  },

  "UI/UX Designer": {
    description: "A roadmap for becoming a creative designer.",
    sections: [
      {
        title: "1. Design Basics",
        description: "Color theory, typography, spacing.",
        resources: [
          { text: "Canva Design School", link: "https://www.canva.com/learn/design/" },
        ],
      },
      {
        title: "2. UI Tools",
        description: "Learn practical design tools.",
        resources: [
          { text: "Figma Tutorials", link: "https://help.figma.com" },
        ],
      },
      {
        title: "3. UX Research",
        description: "User personas, wireframes, flows.",
        resources: [
          { text: "UX Crash Course", link: "https://thegymnasium.com/courses/course-v1:GYM+015+0/about" },
        ],
      },
    ],
  },

  "Cybersecurity Analyst": {
    description: "Learn how to protect systems, networks, and data.",
    sections: [
      {
        title: "1. Networking Basics",
        description: "TCP/IP, protocols, firewalls.",
        resources: [
          { text: "Networking Basics", link: "https://youtu.be/qiQR5rTSshw" },
        ],
      },
      {
        title: "2. Ethical Hacking",
        description: "Reconnaissance, exploitation.",
        resources: [
          { text: "Kali Linux", link: "https://www.kali.org/docs/" },
        ],
      },
    ],
  },

  "Cloud Engineer": {
    description: "Master AWS, Azure, and cloud fundamentals.",
    sections: [
      {
       title: "1. Cloud Basics",
        description: "Compute, storage, networking.",
        resources: [
          { text: "AWS Beginner Path", link: "https://aws.amazon.com/training/" },
        ],
      },
      {
       title: "2. Virtualization & Containers",
        description: "Docker, Kubernetes.",
        resources: [
          { text: "Docker Docs", link: "https://docs.docker.com/" },
        ],
      },
    ],
  },

  "Product Manager": {
    description: "Learn strategy, research, prioritization & launching products.",
    sections: [
      {
        title: "1. PM Basics",
        description: "Product thinking, market research.",
        resources: [
          { text: "Product Management Basics", link: "https://youtu.be/8d5xV1G7D2Q" },
        ],
      },
      {
        title: "2. Roadmapping & Strategy",
        description: "Feature planning, prioritization.",
        resources: [
          { text: "PM Roadmaps", link: "https://www.productplan.com/" },
        ],
      },
    ],
  },

  "Android Developer": {
    description: "Learn how to build Android apps using modern tools like Kotlin & Jetpack.",
    sections: [
      {
        title: "1. Programming Basics",
        description: "Understand Java/Kotlin fundamentals.",
        resources: [
          { text: "Kotlin Docs", link: "https://kotlinlang.org/docs/home.html" },
          { text: "Java Basics", link: "https://docs.oracle.com/javase/tutorial/" },
        ],
      },
      {
        title: "2. Android Fundamentals",
        description: "Learn activities, layouts, intents, UI components.",
        resources: [
          { text: "Android Basics", link: "https://developer.android.com/courses/android-basics-kotlin/course" },
        ],
      },
      {
        title: "3. Jetpack & Architecture",
        description: "MVVM, LiveData, Room DB.",
        resources: [
          { text: "Jetpack Guide", link: "https://developer.android.com/jetpack" },
        ],
      },
    ],
  },

  "iOS Developer": {
    description: "Learn app development for Apple ecosystem using Swift & SwiftUI.",
    sections: [
      {
        title: "1. Swift Basics",
        description: "Learn the fundamentals of Swift.",
        resources: [
          { text: "Swift Docs", link: "https://developer.apple.com/swift/" },
        ],
      },
      {
        title: "2. iOS App Development",
        description: "UIKit or SwiftUI essentials.",
        resources: [
          { text: "SwiftUI Tutorial", link: "https://developer.apple.com/tutorials/swiftui" },
        ],
      },
      {
        title: "3. App Deployment",
        description: "Learn App Store publishing.",
        resources: [
          { text: "App Distribution Guide", link: "https://developer.apple.com/app-store/submission/" },
        ],
      },
    ],
  },

  "Blockchain Developer": {
    description: "Learn smart contracts, decentralized apps, and Web3.",
    sections: [
      {
        title: "1. Blockchain Basics",
        description: "Crypto fundamentals & distributed systems.",
        resources: [
          { text: "Blockchain Basics", link: "https://www.ibm.com/topics/blockchain" },
        ],
      },
      {
        title: "2. Smart Contracts",
        description: "Learn Solidity and EVM.",
        resources: [
          { text: "Solidity Docs", link: "https://docs.soliditylang.org" },
        ],
      },
      {
        title: "3. Web3 & DApps",
        description: "Build decentralized applications.",
        resources: [
          { text: "Web3.js Guide", link: "https://web3js.readthedocs.io" },
        ],
      },
    ],
  },

  "Game Developer": {
    description: "Learn game design, Unity/Unreal engine, physics and rendering.",
    sections: [
      {
        title: "1. Programming Fundamentals",
        description: "C#, OOP, game loops.",
        resources: [
          { text: "C# Basics", link: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
        ],
      },
      {
        title: "2. Game Engine",
        description: "Learn Unity or Unreal.",
        resources: [
          { text: "Unity Learn", link: "https://learn.unity.com/" },
        ],
      },
      {
        title: "3. Game Design",
        description: "Mechanics, levels, audio.",
        resources: [
          { text: "Game Design Book", link: "https://gamedesignconcepts.wordpress.com/" },
        ],
      },
    ],
  },

  "DevOps Engineer": {
    description: "Learn CI/CD pipelines, Linux, Docker, Kubernetes & monitoring.",
    sections: [
      {
        title: "1. Linux & Networking",
        description: "Essential commands and system design basics.",
        resources: [
          { text: "Linux Basics", link: "https://www.youtube.com/watch?v=Roz_c9uD3fY" },
        ],
      },
      {
        title: "2. CI/CD Fundamentals",
        description: "GitHub Actions, Jenkins pipelines.",
        resources: [
          { text: "GitHub Actions", link: "https://docs.github.com/en/actions" },
        ],
      },
      {
        title: "3. Containers & Orchestration",
        description: "Docker, Kubernetes.",
        resources: [
          { text: "Kubernetes Docs", link: "https://kubernetes.io/docs/home/" },
        ],
      },
    ],
  },

  "Digital Marketer": {
    description: "Learn SEO, content strategy, paid ads, analytics.",
    sections: [
      {
        title: "1. Marketing Basics",
        description: "Branding, funnels, messaging.",
        resources: [
          { text: "HubSpot Marketing", link: "https://academy.hubspot.com/courses/marketing" },
        ],
      },
      {
        title: "2. SEO & SEM",
        description: "Search optimization, paid ads.",
        resources: [
          { text: "Google SEO Guide", link: "https://developers.google.com/search/docs" },
        ],
      },
      {
        title: "3. Analytics",
        description: "Google Analytics, metrics.",
        resources: [
          { text: "Analytics Academy", link: "https://analytics.google.com/analytics/academy/" },
        ],
      },
    ],
  },

  "Content Writer": {
    description: "Master writing, storytelling, brand tone & SEO writing.",
    sections: [
      {
        title: "1. Writing Basics",
        description: "Grammar, clarity, formatting.",
        resources: [
          { text: "Grammarly Blog", link: "https://www.grammarly.com/blog/" },
        ],
      },
      {
        title: "2. SEO Writing",
        description: "Keyword analysis, ranking.",
        resources: [
          { text: "SEO Guide by Moz", link: "https://moz.com/beginners-guide-to-seo" },
        ],
      },
      {
        title: "3. Copywriting",
        description: "Brand voice, CTA, persuasion.",
        resources: [
          { text: "Copywriting Crash Course", link: "https://youtu.be/K2yHFRVr2H0" },
        ],
      },
    ],
  },

  "Data Engineer": {
    description: "Learn pipelines, ETL systems, big data & cloud.",
    sections: [
      {
        title: "1. SQL & Python",
        description: "Master data processing.",
        resources: [
          { text: "SQL Tutorial", link: "https://www.w3schools.com/sql/" },
        ],
      },
      {
        title: "2. Big Data Tools",
        description: "Hadoop, Spark, Kafka.",
        resources: [
          { text: "Apache Spark Docs", link: "https://spark.apache.org/docs/latest/" },
        ],
      },
      {
        title: "3. Cloud Data Warehousing",
        description: "AWS, GCP, Snowflake basics.",
        resources: [
          { text: "AWS Data Engineer", link: "https://aws.amazon.com/big-data/datalakes-and-analytics/" },
        ],
      },
    ],
  },

  "QA Automation Engineer": {
    description: "Testing frameworks, automation, CI/CD test pipelines.",
    sections: [
      {
        title: "1. Testing Basics",
        description: "Manual testing, bug reporting.",
        resources: [
          { text: "Software Testing Guide", link: "https://www.guru99.com/software-testing.html" },
        ],
      },
      {
        title: "2. Automation Tools",
        description: "Selenium, Playwright, Postman.",
        resources: [
          { text: "Selenium Docs", link: "https://www.selenium.dev/documentation/" },
        ],
      },
      {
        title: "3. CI/CD Integration",
        description: "Automated pipelines for tests.",
        resources: [
          { text: "Jenkins Tutorials", link: "https://www.jenkins.io/doc/" },
        ],
      },
    ],
  },

  "Business Analyst": {
    description: "Learn requirements analysis, documentation, communication & diagrams.",
    sections: [
      {
        title: "1. BA Fundamentals",
        description: "Business processes, documentation.",
        resources: [
          { text: "BA Basics", link: "https://www.smart-ba.com/business-analyst-training/" },
        ],
      },
      {
        title: "2. Tools & Techniques",
        description: "Excel, Tableau, UML.",
        resources: [
          { text: "Tableau Training", link: "https://www.tableau.com/learn/training" },
        ],
      },
      {
        title: "3. Communication & Strategy",
        description: "Stakeholder management.",
        resources: [
          { text: "Effective Communication", link: "https://youtu.be/omL9Tjh2DOg" },
        ],
      },
    ],
  },
};

export default roadmapData;
