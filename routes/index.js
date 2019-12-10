var express = require('express');
var router = express.Router();

let mysql = require('mysql');

let con = mysql.createConnection({
  host: 'localhost',
  database: 'projet',
  user: 'root',
  password: null
})

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = 'SELECT * FROM client;'
  con.query(query, (err, result) => {
    res.render('index', { title: 'Express', clients: result });
  })
});

module.exports = router;
