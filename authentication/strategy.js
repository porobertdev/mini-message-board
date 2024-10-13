const LocalStrategy = require('passport-local').Strategy;

const verifyCb = (username, password, done) => {};

module.exports = new LocalStrategy(verifyCb);
