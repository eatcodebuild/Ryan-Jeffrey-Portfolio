require("dotenv").config();
const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/login", (req, res) => {
  const error = req.session.loginError || null;
  req.session.loginError = null;
  res.render("login", { error });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    req.session.isAuthenticated = true;
    res.redirect("/admin");
  } else {
    req.session.loginError = "Invalid username or password";
    res.redirect("/login");
  }
});

router.get("/admin", (req, res) => {
  if (req.session.isAuthenticated) {
    res.sendFile(path.join(__dirname, "../public/admin.html"));
  } else {
    res.render("login", { error: "Invalid username or password" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
