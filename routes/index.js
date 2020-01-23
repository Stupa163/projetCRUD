var express = require('express');
var router = express.Router();
const Models = require('../models');
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
    let popUser = auth(req);

    console.log(auth(req));

    if (popUser === undefined) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic Authentication');
        res.end('Authorization is needed.');
    } else {
        Models.user.findOne({email: popUser['name']}).then(
            (user) => {
                if (!user) {
                    return res.status(401).send('user not found')
                }
                if (user.password === popUser['pass']) {
                    const token = jwt.sign(
                        {userId: user.id_user},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'});
                    Models.client.findAll()
                        .then((clients) => {
                            res.render('index', {title: 'Express', clients: clients, token: token})
                        })
                        .catch((error) => {
                            res.status(error.status || 500).send(error.message)
                        })
                } else {
                    return res.status(401).send('Incorrect password');
                }
            }
        ).catch(
            (error) => {
                res.status(500).json({
                    error: error
                });
            }
        );
    }
});

module.exports = router;
