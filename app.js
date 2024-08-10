// Import required modules and setup
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Quotes = require("randomquote-api");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Serve the contact view
app.get('/contact', (req, res) => {
  res.render('contact'); // This will render the contact.ejs file
});

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
  }
});

// Handle contact form submission
app.post('/submit-contact', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `Contact form submission from ${name}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ success: false, error: error.toString() }); // More detailed error logging
      }
      console.log('Email sent:', info.response);
      res.json({ success: true });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
