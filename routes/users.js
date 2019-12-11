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
  let query = 'SELECT * FROM client WHERE client.id_client=' + req.params.id
  con.query(query, (err, result) => {
    if(err) {
      throw err
    }

    if (result.length === 0) {
      res.send('Impossible de trouver un client avec cet id')
    }

    let query2 = 'SELECT * FROM commande WHERE commande.id_client=' + req.params.id

    con.query(query2, (err2, result2) => {
      if (err2) {
        throw err2
      }

      res.render('clientDetails', {client: result[0], commandes: result2})
    })

  })
});

router.post('/:id', (req, res, next) => {
  let query = 'UPDATE client SET ' +
    'nom="' + req.body.nom + '",' +
    'prenom="' + req.body.prenom + '",' +
    'adresse="' + req.body.adresse + '",' +
    'date_naissance="' + req.body.date_naissance + '",' +
    'numero="' + req.body.numero + '",' +
    'civilite="' + req.body.civilite + '" ' +
    'WHERE client.id_client=' + req.params.id

  con.query(query, (err, result) => {
    if (err){
      throw err
    }

    res.redirect('/users/' + req.params.id)
  })
})

module.exports = router;
