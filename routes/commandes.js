var express = require('express');
var router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
  host: 'localhost',
  database: 'projet',
  user: 'root',
  password: null
})

/* GET users listing. */
router.get('/:id', function(req, res, next) {

  let query = 'SELECT * FROM commande ' +
    'LEFT JOIN commande_produit ON commande.id_commande=commande_produit.id_commande' +
    ' LEFT JOIN produit ON commande_produit.id_produit=produit.id_produit' +
    ' WHERE commande.id_commande=' + req.params.id

  con.query(query, (err, result) => {
    if (err) {
      throw err
    }

    console.log(result);

    res.render('commandeDetails', {produits: result})
  })

});

module.exports = router;
