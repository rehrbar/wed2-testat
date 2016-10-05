var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/notes', function(req, res) {
  res.send('respond with a resource');
});

router.get('/notes/new', function(req, res) {
  res.send('respond with a resource');
});
router.get('/notes/:id', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
