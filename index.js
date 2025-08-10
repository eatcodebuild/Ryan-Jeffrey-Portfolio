const express = require("express");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

const pageRoutes = require("./routes/pages");
const contactFormRoutes = require("./routes/contactForm");
const projectRoutes = require("./routes/projects");
const blogRoutes = require("./routes/blogs");

app.use("/", pageRoutes);
app.use("/", contactFormRoutes);
app.use("/", projectRoutes);
app.use("/", blogRoutes);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to database");

    app.listen(port, () => {
      console.log(`✅ Listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
})();

app.listen(port, () => {
  console.log(`✅ Listening on http://localhost:${port}`);
});
