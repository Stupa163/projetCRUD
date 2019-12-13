var express = require('express');
var router = express.Router();
const Models = require('../models');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  Models.client.findByPk(req.params.id)
    .then((client) => {
      Models.commande.findAll({
        where: {'id_client': req.params.id}
      })
        .then((commandes) => {
          Models.ville.findByPk(client.id_ville)
            .then((ville) => {
              res.render('clientDetails', {client: client, ville: ville, commandes: commandes})
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
});

router.put('/:id', (req, res, next) => {

  champsUpdated = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    adresse: req.body.adresse,
    date_naissance: req.body.date_naissance,
    civilite: req.body.civilite,
  }


  if (req.body.labelVille === '') {
    champsUpdated.id_ville = null;
  } else {
    champsUpdated.id_ville = req.body.ville
  }

  Models.client.update(champsUpdated, {where: {id_client: req.params.id}})
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
      console.log(error)
      res.status(error.status || 500).send(error.message)
    })
})

module.exports = router;
