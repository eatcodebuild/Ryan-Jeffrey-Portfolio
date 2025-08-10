const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/get/projects", (req, res) => {
  fs.readFile(path.join(__dirname, "../JSON/projects.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read file" });
    }
    res.json(JSON.parse(data));
  });
});

module.exports = router;
