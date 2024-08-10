const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const mailOptions = {
  from: process.env.GMAIL_USER,
  to: process.env.GMAIL_USER,
  subject: 'Test Email',
  text: 'This is a test email.'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('Error sending email:', error);
  }
  console.log('Email sent:', info.response);
});
