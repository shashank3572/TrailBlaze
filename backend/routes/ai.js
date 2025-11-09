const express = require("express");
const Career = require("../models/Career");
const router = express.Router();

router.post("/recommend", async (req, res) => {
  const { skills } = req.body;
  if (!skills || skills.length === 0)
    return res.status(400).json({ message: "No skills provided" });

  const careers = await Career.find();

  const scored = careers.map((c) => {
    const items = c.sections.flatMap((s) => s.items.map((i) => i.title.toLowerCase()));

    const matches = items.filter((x) =>
      skills.some((s) => x.includes(s.toLowerCase()))
    );

    const score = Math.round((matches.length / items.length) * 100);

    return { title: c.title, score };
  });

  const sorted = scored.sort((a, b) => b.score - a.score);

  res.json(sorted.slice(0, 3));
});

module.exports = router;
