var express = require('express');
var router = express.Router();
let mysql = require('mysql');
const Models = require('../models');

let con = mysql.createConnection({
  host: 'localhost',
  database: 'projet',
  user: 'root',
  password: null
})

/* GET users listing. */
router.get('/:id', function(req, res, next) {

  Models.commande.findByPk(req.params.id)
    .then((commande) => {
      Models.commande_produit.findAll({
        where: {id_commande: req.params.id}
      })
        .then(async (commandes_produit) => {

          Models.produit.findAll({
            where: { id_produit: commandes_produit.map((commande_produit) => {return commande_produit.id_produit}) }
          })
            .then((produits) => {
              res.render('commandeDetails', {commande: commande, commandes_produit: commandes_produit, produits: produits})
            })
            .catch((error) => {
              console.log(error)
              res.status(error.status || 500).send(error.message)
            })
        })
        .catch((error) => {
          console.log(error)
          res.status(error.status || 500).send(error.message)
        })
    })
    .catch((error) => {
      console.log(error)
      res.status(error.status || 500).send(error.message)
    })

  // let query = 'SELECT * FROM commande ' +
  //   'LEFT JOIN commande_produit ON commande.id_commande=commande_produit.id_commande' +
  //   ' LEFT JOIN produit ON commande_produit.id_produit=produit.id_produit' +
  //   ' WHERE commande.id_commande=' + req.params.id
  //
  // con.query(query, (err, result) => {
  //   if (err) {
  //     throw err
  //   }

    // res.render('commandeDetails', {produits: result})
  // })

});

module.exports = router;
