const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const port = process.env.PORT || 3000;
const nodeMailer = require("nodemailer");
const fs = require("fs");

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

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

app.get("/blog", (req, res) => {
  res.sendFile(path.join(__dirname, "public/blog.html"));
});

// // MongoDB
// (async () => {
//   try {
//   } catch (err) {
//     console.error("Error:", err);
//     process.exit(1);
//   }
// })();

// Handles contact form ↓

app.post("/send-email", async (req, res) => {
  const { name, phone, email, message } = req.body;

  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
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

app.get("/get/blogs", (req, res) => {
  fs.readFile(path.join(__dirname, "blogs.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read file" });
    }
    res.json(JSON.parse(data));
  });
});

app.get("/blog/:id", (req, res) => {
  const blogId = parseInt(req.params.id, 10);
  fs.readFile(path.join(__dirname, "blogs.json"), "utf8", (err, data) => {
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

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
