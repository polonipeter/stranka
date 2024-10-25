const nodemailer = require('nodemailer');
const validator = require('validator');

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { name, email, phone, message } = req.body;

    // Input validation and sanitization
    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid email address');
    }

    if (phone && !validator.isMobilePhone(phone, 'any')) {
        return res.status(400).send('Invalid phone number');
    }

    if (!validator.isLength(message, { min: 1, max: 500 })) {
        return res.status(400).send('Message must be between 1 and 500 characters');
    }

    const sanitizedMessage = validator.escape(message);
    const sanitizedName = validator.escape(name);
    const sanitizedEmail = validator.escape(email);
    const sanitizedPhone = phone ? validator.escape(phone) : '';

    // Configure email transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Nová správa od ' + sanitizedName,
        text: `Nová správa od: ${sanitizedName}.\n\n` +
              `Email: ${sanitizedEmail}\n` +
              (sanitizedPhone ? `Telefónne číslo: ${sanitizedPhone}\n\n` : '') +
              `Správa:\n${sanitizedMessage}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error sending email');
    }
};
