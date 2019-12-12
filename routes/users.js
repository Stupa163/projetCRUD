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

  Models.client.findOne({
    where: {id_client: req.params.id}
  })
    .then((client) => {
      Models.commande.findAll({
        where: {'id_client': req.params.id}
      })
        .then((commandes) => {
          res.render('clientDetails', {client: client, commandes: commandes})
        })
        .catch((error) => {
          res.status(error.status || 500).send(error.message)
        })
    })
    .catch((error) => {
      res.status(error.status || 500).send(error.message)
    })

});

router.post('/:id', (req, res, next) => {
  Models.client.update({
    nom: req.body.nom,
    prenom: req.body.prenom,
    adresse: req.body.adresse,
    date_naissance: req.body.date_naissance,
    civilite: req.body.civilite,
  }, {where: {id_client: req.params.id}})
    .then(() => {
      Models.client.findAll()
        .then((clients) => {
          res.render('index', {title: 'Express', clients: clients})
        })
        .catch((error) => {
          res.status(error.status || 500).send(error.message)
        })
    })
    .catch((error) => {
      res.status(error.status || 500).send(error.message)
    })
})

module.exports = router;
