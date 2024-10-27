// because I like its simpler syntax instead the passport's implementation
const jwt = require('jsonwebtoken');
const { loadEnvConfig } = require('../utils');

loadEnvConfig();

const generateJWT = (payload) => {
    const bearerToken = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d',
    });

    return bearerToken;
};

const isJWTValid = (token) => {
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch (err) {
        console.log('🚀 ~ isJWTValid ~ err:', err);
        return false;
    }
};

const extractJWT = (cookie) => {
    // we store both, session-id and bearer-token.
    // Plus, there's a ; at the end that needs to be removed
    return cookie.split(' ')[0].split('bearer-token=')[1].replace(';', '');
};

module.exports = { generateJWT, isJWTValid, extractJWT };
