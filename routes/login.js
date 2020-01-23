var express = require('express');
var router = express.Router();
const Models = require('../models');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('login');
})

router.post('/', function(req, res, next) {
    Models.user.findOne({email: req.body.email}).then(
        (user) => {
            if (!user) {
                return res.status(401).send('user not found')
            }
            if (user.password === req.body.password) {
                const token = jwt.sign(
                    {userId: user.id_user},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn: '24h'});
                res.status(200).json({
                    userId: user.id_user,
                    token: token
                });
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
});

module.exports = router;
