const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const port = process.env.PORT || 3000;
const nodeMailer = require("nodemailer");
const fs = require("fs");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handles Displaying of HTML Pages ↓

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public/about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public/contact.html"));
});

app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "public/projects.html"));
});

app.get("/sitemap", (req, res) => {
  res.sendFile(path.join(__dirname, "public/sitemap.xml"));
});

// Handles contact form ↓

app.post("/send-email", async (req, res) => {
  const { name, phone, email, message } = req.body;

  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "contact.ryanjeffrey@gmail.com",
        pass: "dhqrewcjriabvgsh",
      },
    });

    const mailOptions = {
      from: email,
      to: "r.jeffrey@live.com.au",
      subject: `New Contact Form Message From ${name}`,
      text: `You've received a new message from: \n \n Name: ${name} \n Email: ${email} \n Phone: ${phone} \n \n Message: \n ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending mail:", error);
    res.status(500).json({ success: false, message: "Email failed to send" });
  }
});

app.get("/get/projects", (req, res) => {
  fs.readFile(path.join(__dirname, "projects.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read file" });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
