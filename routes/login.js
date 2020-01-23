var express = require('express');
var router = express.Router();
const Models = require('../models');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('login');
})

router.post('/', function(req, res, next) {
});

module.exports = router;
