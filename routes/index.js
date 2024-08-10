var express = require('express');
var router = express.Router();
const Quotes = require('randomquote-api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET random quote. */
router.get('/quote', function(req, res, next) {
  const randomquote = Quotes.randomQuote();
  res.json(randomquote);
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});


module.exports = router;
