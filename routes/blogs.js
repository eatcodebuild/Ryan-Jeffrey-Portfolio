const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/get/blogs", (req, res) => {
  fs.readFile(path.join(__dirname, "../JSON/blogs.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read file" });
    }
    res.json(JSON.parse(data));
  });
});

router.get("/blog/:id", (req, res) => {
  const blogId = parseInt(req.params.id, 10);
  fs.readFile(path.join(__dirname, "../JSON/blogs.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read file" });
    }
    const blogs = JSON.parse(data); // Parse JSON string to array
    const blog = blogs.find((b) => b.id === blogId);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    // Render your EJS page with the found blog
    res.render("blogPost", { blog });
  });
});

module.exports = router;
