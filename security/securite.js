const Model = require('../models');
const jwt = require('jsonwebtoken');

exports.authentification = () => async (req, res, next) => {
    const token = req.headers.token;

    if (token === undefined || token === null || token === 'null') {
        res.status(401).json({
            error: 'missing token'
        });
    }
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
        res.status(401).json({
            error: 'invalid token'
        });
    } else {
        console.log('ok');
        next();
    }
};

