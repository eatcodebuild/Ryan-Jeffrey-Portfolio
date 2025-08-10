const express = require("express");
const nodeMailer = require("nodemailer");

const router = express.Router();

router.post("/send-email", async (req, res) => {
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

module.exports = router;
