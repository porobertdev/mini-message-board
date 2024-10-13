const passport = require('passport');
const localStrategy = require('./strategy');
const { getUserById } = require('../database/queries');
const { admin } = require('../database/config');

passport.use(localStrategy);
passport.serializeUser((user, done) => {
    // null = no error
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await getUserById(id, admin.table);
        const user = rows[0];

        // user found, no error. Send it to passport.authenticate()
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
