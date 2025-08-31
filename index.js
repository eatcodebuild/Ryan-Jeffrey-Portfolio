require("dotenv").config();
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 3000;
const express = require("express");
const session = require("express-session");
// const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "we7mdcosvnfd87dshsocvnvdpov89", // used to sign the session ID cookie
    resave: false, // don’t save session if unmodified
    saveUninitialized: true, // save new sessions even if empty
    cookie: {
      secure: false, // set true if using HTTPS
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

app.use(express.static(path.join(__dirname, "/public")));

const pageRoutes = require("./routes/pages");
const contactFormRoutes = require("./routes/contactForm");
const projectRoutes = require("./routes/projects");
const blogRoutes = require("./routes/blogs");
const authRoutes = require("./routes/auth");

app.use("/", pageRoutes);
app.use("/", contactFormRoutes);
app.use("/", projectRoutes);
app.use("/", blogRoutes);
app.use("/", authRoutes);

// (async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ Connected to database");

//     app.listen(port, () => {
//       console.log(`✅ Listening on http://localhost:${port}`);
//     });
//   } catch (err) {
//     console.error("Error:", err);
//     process.exit(1);
//   }
// })();

app.listen(port, () => {
  console.log(`✅ Listening on http://localhost:${port}`);
});
