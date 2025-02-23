const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const port = process.env.PORT || 3000;
const nodeMailer = require('nodemailer');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handles Displaying of HTML Pages ↓

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/about.html'))
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/contact.html'))
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/blog.html'))
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/projects.html'))
});

app.get('/testimonials', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/testimonials.html'))
});

// Handles contact form ↓

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const transporter = nodeMailer.createTransport({
            service: 'Outlook',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.USER_EMAIL,
            subject: `New Contact Form Message From ${name}!`,
            text: `You've received a new message from: \n \n Name: ${name} \n Email: ${email} \n Message: ${message}`,
        };

        await transporter.sendMail(mailOptions); 
        
        res.json({ success: true, message: "Email sent successfully!"});
    }

    catch (error) {
        console.error("Error sending mail:", error);
        res.status(500).json({ success: false, message: "Email failed to send"})
    }
});












app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
