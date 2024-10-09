require('dotenv').config(); // Load environment variables
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const rateLimit = require('express-rate-limit'); // Rate limiting
const validator = require('validator'); // For input validation
const helmet = require('helmet'); // For setting secure headers

const app = express();
const port = 3000; // HTTP port

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for local file access (file:// protocol)
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin === 'null' || origin.startsWith('file://')) {
            callback(null, true); // Allow access for local HTML files
        } else {
            callback(new Error('Not allowed by CORS')); // Restrict other origins
        }
    },
    optionsSuccessStatus: 200
}));

// Helmet for secure HTTP headers
app.use(helmet());

// Rate limiting: Limit each IP to 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// Route to handle email sending
app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Input validation and sanitization
    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid email address');
    }

    if (phone && typeof phone === 'string' && !validator.isMobilePhone(phone, 'any')) {
        return res.status(400).send('Invalid phone number');
    }

    if (!validator.isLength(message, { min: 1, max: 500 })) {
        return res.status(400).send('Message must be between 1 and 500 characters');
    }

    const sanitizedMessage = validator.escape(message); // Sanitize message
    const sanitizedName = validator.escape(name);
    const sanitizedEmail = validator.escape(email);
    const sanitizedPhone = phone ? validator.escape(phone) : ''; // Sanitize phone if defined

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
        subject: 'Nová správa od ' + sanitizedName,
        text: `Nová správa od: ${sanitizedName}.\n\n` +
              `Email: ${sanitizedEmail}\n` +
              (sanitizedPhone ? `Telefónne číslo: ${sanitizedPhone}\n\n` : '') + // Add phone only if it's defined
              `Správa:\n${sanitizedMessage}`
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

// Start HTTP server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
