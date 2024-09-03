require('dotenv').config(); // Load environment variables
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
const port = 3000; // You can choose any port you prefer

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Route to handle email sending
app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Configure the email transport using your SMTP server
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // or another email provider like 'Outlook', 'Yahoo', etc.
        auth: {
            user: process.env.EMAIL_USER, // Use environment variable
            pass: process.env.EMAIL_PASS  // Use environment variable
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // Use environment variable
        to: process.env.EMAIL_USER, // Sending email to the same address
        subject: 'New Message from ' + name,
        text: `You have received a new message from ${name}.\n\n` +
              `Email: ${email}\n` +
              `Phone: ${phone}\n\n` +
              `Message:\n${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
