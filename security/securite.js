const jwt = require('jsonwebtoken');

exports.authentification = () => async (req, res, next) => {
    const token = req.headers.token;

    if (token === undefined || token === null || token === 'null') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Digest realm="Digest Authentication"');
        res.end('Authorization is needed.');
    }
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
        res.status(401).json({error: 'invalid token'});
    } else {
        next();
    }
};

