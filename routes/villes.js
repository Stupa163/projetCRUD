var express = require('express');
var router = express.Router();
const Models = require('../models');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

/* GET home page. */
router.get('/:nomIncomplet', function(req, res, next) {
  Models.ville.findAll({
    where: { nom: { [op.like]: '%' + req.params.nomIncomplet +   '%' } }
  })
    .then((villes) => {
      res.json(villes.map((ville) => {
        return {label : ville.nom + ' (' + ville.code_postal + ')', value: ville.id_ville}
      }))
    })
});

module.exports = router;
