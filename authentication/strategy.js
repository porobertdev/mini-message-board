const bcrypt = require('bcryptjs/dist/bcrypt');
const { getUserByName } = require('../database/queries');
const { admin } = require('../database/config');

const LocalStrategy = require('passport-local').Strategy;

const verifyCb = async (username, password, done) => {
    try {
        const { rows } = await getUserByName(username, admin.table);
        const user = rows[0];

        // validate username
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }

        // validate password
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return done(null, false, { message: 'Incorrect password' });
        }

        // pass user obj to passport.authenticate, which then passes it to req.user
        return done(null, user);
    } catch (err) {
        return done(err);
    }
};

module.exports = new LocalStrategy(verifyCb);
