var express = require('express');
var router = express.Router();
const Models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  Models.client.findAll()
    .then((clients) => {
      res.render('index', {title: 'Express', clients: clients})
    })
    .catch((error) => {
      res.status(error.status || 500).send(error.message)
    })
});

module.exports = router;
